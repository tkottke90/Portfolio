import { Injectable, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import * as Github from 'octonode';
import { DebuggerService } from './debugger.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GithubApiService {
    client;
    events: BehaviorSubject<Array<GithubEventData>> = new BehaviorSubject([]);

    constructor( private http: HttpClient ) {
        this.client = Github.client();
    }

    getActivity(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.get('/users/tkottke90/events', {}, async (err, status, body, headers) => {
                if (err) { console.error(`Error: ${err}`); reject(err); }
                console.log(`Type: ${typeof body}\nCount: ${body.length}`);

                const newEvents = new Array<GithubEventData>();

                for (let i = 0; (i < body.length && i < 6); i++) {

                    switch (body[i]['type']) {
                        case 'CreateEvent':
                            await this.http.get(body[i]['repo']['url']).toPromise().then( res => {
                                newEvents.push(new CreateEvent(body[i], res['html_url']));
                            }).catch( createError => {
                                newEvents.push(new CreateEvent(body[i], 'https://github.com/tkottke/404error'));
                            });
                            break;
                        case 'DeleteEvent':
                            break;
                        /* case 'IssuesEvent':
                            await this.http.get(body[i]['payload']['issue']['url']).toPromise().then( res => {
                                newEvents.push(new IssuesEvent(body[i], res['html_url']));
                            }).catch( issuesErr => {
                                newEvents.push(new IssuesEvent(body[i], ''));
                                // TODO - Add Firebase/Express Function to Handle Error Logging
                            });
                            break;
                        case 'IssuesCommentEvent':
                            break; */
                        case 'PushEvent':
                            const payload = body[i]['payload'];
                            const commits: Array<GithubCommit> = [];

                            for (let c = 0; c < payload['commits'].length; c++) {
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
                                newEvents.push(new PushEvent(body[i], res['html_url'], commits));
                            });
                            break;
                        case 'WatchEvent':
                            break;
                    }
                }

                this.events.next(newEvents);
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
        this.OutputMsg = `<a href="${url}">${this.ID}</a> ${this.Notes}`;
    }
}

export class GithubEventData {
    action_icon: string;
    Date: Date;
    Repo: string;
    objectInstance: Object;

    message;


    constructor (
        o: Object
    ) {
        this.objectInstance = o;
        this.Date = o['created_at'];
        this.Repo = o['repo']['name'];
    }
}


export class CreateEvent extends GithubEventData {
    constructor (
        instance: Object,
        gitURL: string
    ) {
        super(instance);
        this.action_icon = eventIcons.Create;
        this.message = `Thomas created new repo called <a href="${gitURL}">${instance['repo']['name'].split('/')[1]}<a>`;
        this.objectInstance = instance;

        // console.log(this.message);
    }

}


export class PushEvent extends GithubEventData {
    commits: Array<GithubCommit> = [];

    constructor (
        instance: Object,
        gitURL: string,
        com: Array<GithubCommit>
    ) {
        super(instance);
        this.action_icon = eventIcons.Push;
        const payload = instance['payload'];
        const branch = this.getBranch(payload['ref']);

        this.commits = com;
        this.message = `Thomas pushed to <a href="${gitURL}/tree/${branch}">${branch}</a> at <a href="${gitURL}">${this.Repo}</a>`;

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
        gitURL: string
    ) {
        super(instance);
        this.action_icon = eventIcons.Issue;
        const payload = instance['payload'];

        this.message = `Thomas ${payload['action']} an issue in ${instance['repo']['name']}`;
        this.issueTitle = payload['issue']['title'];
        this.issueText = payload['issue']['body'];
        this.issueUrl = gitURL;

        console.log(this.message);
        // console.log(`   ${this.issueTitle}\n    ${this.issueText.substring(0, 30)}`);
        // console.log(`   ${this.issueUrl}`);
    }

}

export class DeleteEvent extends GithubEventData {
    constructor (
        instance: Object
    ) {
        super(instance);
        this.action_icon = eventIcons.Delete;
    }

}

export class WatchEvent extends GithubEventData {
    constructor (
        instance: Object
    ) {
        super(instance);
        this.action_icon = eventIcons.Watch;
    }

}
