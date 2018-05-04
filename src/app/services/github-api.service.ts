import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';
import * as Github from 'octonode';
import { DebuggerService } from './debugger.service';

@Injectable()
export class GithubApiService {
    client;
    events: Array<GithubEventData> = new Array();

    constructor( private http: HttpClient ) {
        this.client = Github.client();
    }

    async getActivity(): Promise<any> {
        await this.client.get('/users/tkottke90/events', {}, async (err, status, body, headers) => {
            if (err) { console.error(`Error: ${err}`); }
            console.log(`Type: ${typeof body}\nCount: ${body.length}`);

            for (let i = 0; (i < body.length && i < 6); i++) {

                switch (body[i]['type']) {
                    case 'CreateEvent':
                        this.events.push(new CreateEvent(body[i]));
                        break;
                    case 'DeleteEvent':
                        break;
                    case 'IssuesEvent':
                        await this.http.get(body[i]['payload']['issue']['url']).toPromise().then( res => {
                            this.events.push(new IssuesEvent(body[i], res['html_url']));
                        }).catch( issuesErr => {
                            this.events.push(new IssuesEvent(body[i], ''));
                            // TODO - Add Firebase/Express Function to Handle Error Logging
                        });
                        break;
                    case 'IssuesCommentEvent':
                        break;
                    case 'PushEvent':
                        const payload = body[i]['payload'];
                        const commits: Array<GithubCommit> = [];

                        for (let c = 0; c < payload['commits'].length; c++) {
                            const ID =  payload['commits'][c]['sha'].slice(0, 6);
                            const Message =  payload['commits'][c]['message'];
                            await this.http.get(payload['commits'][c]['url']).toPromise().then(res => {
                                commits.push(new GithubCommit(ID, Message, res['html_url']));
                            }).catch( pushErr => {
                                commits.push(new GithubCommit(ID, Message, ''));
                                // TODO - Add Firebase/Express Function to Handle Error Logging
                            });
                        }
                        this.events.push(new PushEvent(body[i], commits));
                        break;
                    case 'WatchEvent':
                        break;
                }
            }
        });
    }
}

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
        this.OutputMsg = `${this.ID} ${this.Notes}`;
    }
}

export class GithubEventData {
    Date: Date;
    Repo: String;
    objectInstance: Object;

    message: String;


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
        instance: Object
    ) {
        super(instance);
        this.message = `Thomas created new repo called ${instance['repo']['name'].split('/')[1]}`;
        this.objectInstance = instance;

        // console.log(this.message);
    }

}


export class PushEvent extends GithubEventData {
    commits: Array<GithubCommit> = [];

    constructor (
        instance: Object,
        com: Array<GithubCommit>
    ) {
        super(instance);
        const payload = instance['payload'];
        const commits: Array<Object> = com;

        this.message = `Thomas pushed to ${this.getBranch(payload['ref'])} at ${this.Repo}`;
        // console.log(this.message);
    }

    getBranch(ref: String): String {
        const splitStr = ref.split('/');
        return splitStr[splitStr.length - 1];
    }

}

export class IssuesEvent extends GithubEventData {
    issueTitle: String = '';
    issueText: String = '';

    issueUrl: String = '';

    constructor (
        instance: Object,
        gitURL: string
    ) {
        super(instance);
        const payload = instance['payload'];

        this.message = `Thomas ${payload['action']} an issue in ${instance['repo']['name']}`;
        this.issueTitle = payload['issue']['title'];
        this.issueText = payload['issue']['body'];
        this.issueUrl = gitURL;

        // console.log(this.message);
        // console.log(`   ${this.issueTitle}\n    ${this.issueText.substring(0, 30)}`);
        // console.log(`   ${this.issueUrl}`);
    }

}

export class DeleteEvent extends GithubEventData {
    constructor (
        instance: Object
    ) {
        super(instance);
    }

}

export class WatchEvent extends GithubEventData {
    constructor (
        instance: Object
    ) {
        super(instance);
    }

}
