import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import * as Github from 'octonode';
import { DebuggerService } from './debugger.service';
import { FirestoreService } from './firestore.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GithubApiService {
    client;
    events: BehaviorSubject<Array<GithubEventData>> = new BehaviorSubject([]);

    public ServiceError: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor( private http: HttpClient ) {
        this.client = Github.client();

        const updatedEvents: GithubEventData[] = [];

        for (let i = 0; i < 20; i++) {
            updatedEvents.push(new LoadingEvent());
        }

        this.events.next(updatedEvents);
    }

    getActivity(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.get('/users/tkottke90/events', {}, async (err, status, body, headers) => {
                if (err) {
                    this.ServiceError.next(true);
                    // TO-DO Add Firebase Error Log
                    switch (err['headers']['status']) {
                        case '403 Forbidden':
                            console.error(`${err['message']}`);
                            this.events.next([]);
                            break;
                        default:
                            console.error(`Error: ${err}`); reject(err);
                            this.events.next([]);
                            break;
                    }
                } else {
                    const req_remaining = headers['x-ratelimit-remaining'];
                    // tslint:disable-next-line:max-line-length
                    req_remaining > 10 ? console.log(`Requests Remaining: ${req_remaining}`) : console.error(`Low Requests Remaining: ${req_remaining}`);
                    console.log(`Type: ${typeof body}\nCount: ${body.length}`);
                    if (this.ServiceError.value) { this.ServiceError.next(false); }
                        let currentEvent = 0;

                        for (let i = 0; (i < body.length  && i < 20 ); i++) {
                            const updateEvent = this.events.value;

                            switch (body[i]['type']) {
                                case 'CreateEvent':
                                    await this.http.get(body[i]['repo']['url']).toPromise().then( res => {
                                        updateEvent[currentEvent] = new CreateEvent(body[i], res['html_url']);
                                        currentEvent++;
                                    }).catch( createError => {
                                        updateEvent[currentEvent] = new CreateEvent(body[i], 'https://github.com/tkottke/404error');
                                        currentEvent++;
                                    });
                                    break;
                                case 'DeleteEvent':
                                    break;
                                case 'IssuesEvent':
                                    updateEvent[currentEvent] = new IssuesEvent(body[i]);
                                    currentEvent++;
                                    break;
                                case 'CommitCommentEvent':
                                    updateEvent[currentEvent] = new CommitCommentEvent(body[i]);
                                    currentEvent++;
                                    break;
                                case 'IssuesCommentEvent':
                                    updateEvent[currentEvent] = new IssuesCommentEvent(body[i]);
                                    currentEvent++;
                                    break;
                                case 'PushEvent':
                                    const payload = body[i]['payload'];
                                    const commits: Array<GithubCommit> = [];

                                    for (let c = 0; c < payload['commits'].length && c < 2; c++) {
                                        const ID =  payload['commits'][c]['sha'].slice(0, 6);
                                        const Message =  payload['commits'][c]['message'];
                                        await this.http.get(payload['commits'][c]['url']).toPromise().then(res => {
                                            commits.push(new GithubCommit(ID, Message, res['html_url']));
                                        }).catch( pushErr => {
                                            commits.push(new GithubCommit(ID, Message, 'https://github.com/tkottke/404error'));
                                            // TODO - Add Firebase/Express Function to Handle Error Logging
                                        });
                                    }

                                    await this.http.get(body[i]['repo']['url']).toPromise().then( res => {
                                        updateEvent[currentEvent] = new PushEvent(body[i], res['html_url'], commits);
                                        currentEvent++;
                                    });
                                    break;
                                case 'WatchEvent':
                                    updateEvent[currentEvent] = new WatchEvent(body[i]);
                                    currentEvent++;
                                    break;
                            }

                            this.events.next(updateEvent);
                        }

                    }
                    resolve('done');

            });
        });
    }
}

const eventIcons = {
    Create: 'pencil',
    Comment: 'forum',
    Delete: 'delete-forever',
    Issue: 'clipboard-alert',
    Merge: 'source-merge',
    Push: 'arrow-up-bold-hexagon-outline',
    Watch: 'eye'
};

export class GithubCommit {
    ID: String;
    Notes: String;
    URL: String;

    OutputMsg: String;


    constructor(
        id: string,
        msg: string,
        url: string,
    ) {
        this.ID = id;
        this.Notes = msg;
        this.URL = url;
        this.OutputMsg = `<a href="${url}" target="_blank">${this.ID}</a> ${this.Notes}`;
    }
}

export enum EventTypes {
    Loading = -1,
    Create,
    Comment,
    Delete,
    Issue,
    Merge,
    Push,
    Watch
}

export class GithubEventData {
    action_icon: string;
    Date: Date;
    Repo: string;
    objectInstance: Object;
    type: EventTypes;
    message;


    constructor (
        o: Object,
        t: EventTypes
    ) {
        this.objectInstance = o;
        this.Date = o['created_at'];
        this.Repo = o['repo']['name'];
        this.type = t;
    }
}

export class LoadingEvent extends GithubEventData {
    constructor() {
        const nullInstance = {
            'created_at': new Date(0, 0, 0),
            'actor' : {
                'avatar_url' : ''
            },
            'repo': {
                'name': ''
            }
        };
        super(nullInstance, EventTypes.Loading);
        this.message = 'Thomas will do something in the future';
    }
}

export class CommitCommentEvent extends GithubEventData {
    comment: string;
    constructor (
        instance: Object
    ) {
        super(instance, EventTypes.Comment);

        const comment = instance['payload']['comment'];

        this.action_icon = eventIcons.Comment;

        // tslint:disable-next-line:max-line-length
        this.message = `Thomas commented on a <a href="${comment['html_url']} target="_blank">commit</a> at <a href="https://github.com/${this.Repo}" target="_blank">${this.Repo}</a>`;
        this.comment = comment['body'];
    }

}

export class CreateEvent extends GithubEventData {
    constructor (
        instance: Object,
        gitURL: string
    ) {
        super(instance, EventTypes.Create);
        this.action_icon = eventIcons.Create;
        this.message = this.genMessage(gitURL);
        this.objectInstance = instance;

        // console.log(this.message);
    }

    genMessage(URL) {
        switch (this.objectInstance['payload']['ref_type']) {
            case 'repository':
                // tslint:disable-next-line:max-line-length
                return `Thomas created new repo called <a href="${URL}" target="_blank">${this.objectInstance['repo']['name'].split('/')[1]}<a>`;
            case 'branch':
                const branchName = this.objectInstance['payload']['ref'];
                // tslint:disable-next-line:max-line-length
                return `Thomas created <a href="${URL}/tree/${branchName}" target="blank">${branchName}</a> in <a href="${URL} target="_blank">${this.objectInstance['repo']['name'].split('/')[1]}<a>`;
            case 'tag':
                const tag = this.objectInstance['payload']['ref'];
                // tslint:disable-next-line:max-line-length
                return `Thomas created tag [${tag}] for <a href="${URL} target="_blank">${this.objectInstance['repo']['name'].split('/')[1]}<a>`;
            default:
                return `Error in CreateEvent`;
        }
    }

}


export class PushEvent extends GithubEventData {
    commits: Array<GithubCommit> = [];
    myBranch: string;

    moreCommitsStr: string;

    constructor (
        instance: Object,
        gitURL: string,
        com: Array<GithubCommit>
    ) {
        super(instance, EventTypes.Push);
        this.action_icon = eventIcons.Push;
        const payload = instance['payload'];
        this.myBranch = this.getBranch(payload['ref']);

        this.commits = com;
        this.message =
            // tslint:disable-next-line:max-line-length
            `Thomas pushed to <a href="${gitURL}/tree/${this.myBranch}" target="_blank">${this.myBranch}</a> at <a href="${gitURL}" target="_blank">${this.Repo}</a>`;
        // console.log(this.message);
    }

    getBranch(ref: string): string {
        const splitStr = ref.split('/');
        return splitStr[splitStr.length - 1];
    }

}

export class IssuesEvent extends GithubEventData {
    issueTitle: string;
    issueText: string;

    issueUrl: string;

    constructor (
        instance: Object,
    ) {
        super(instance, EventTypes.Issue);
        this.action_icon = eventIcons.Issue;
        const payload = instance['payload'];

        this.issueUrl = payload['issue']['html_url'];
        // tslint:disable-next-line:max-line-length
        this.message = `Thomas ${payload['action']} an <a href="${this.issueUrl}" target="_blank">issue</a> in <a href="https://github.com/${instance['repo']['name']}" target="_blank">${instance['repo']['name']}</a>`;
        this.issueTitle = `Title: ${payload['issue']['title']}`;
        this.issueText = `Info: ${payload['issue']['body']}`;
    }

}

export class IssuesCommentEvent extends GithubEventData {
    comment: string;
    constructor (
        instance: Object
    ) {
        super(instance, EventTypes.Comment);

        const comment = instance['payload']['comment'];

        this.action_icon = eventIcons.Comment;
        // tslint:disable-next-line:max-line-length
        this.message = `Thomas commented on an <a href="${comment['html_url']} target="_blank">issue</a> at <a href="https://github.com/${this.Repo}" target="_blank">${this.Repo}</a>`;
        this.comment = comment['body'];
    }

}

export class DeleteEvent extends GithubEventData {
    constructor (
        instance: Object
    ) {
        super(instance, EventTypes.Delete);
        this.action_icon = eventIcons.Delete;
    }

}

export class WatchEvent extends GithubEventData {
    constructor (
        instance: Object
    ) {
        super(instance, EventTypes.Watch);
        this.action_icon = eventIcons.Watch;
        this.type = EventTypes.Watch;

        // tslint:disable-next-line:max-line-length
        this.message = `Thomas started watching repository <a href="https://github.com/${this.Repo}" target="_blank">${this.Repo}<a>`;
    }

}
