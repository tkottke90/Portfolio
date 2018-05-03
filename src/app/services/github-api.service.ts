import { Injectable } from '@angular/core';
import * as Github from 'octonode';

@Injectable()
export class GithubApiService {
    client;

    events: Array<GithubEventData> = new Array();

    constructor() {
        this.client = Github.client();
    }

    getActivity() {
        return this.client.get('/users/tkottke90/events', {}, (err, status, body, headers) => {
            console.log(`Type: ${typeof body}\nCount: ${body.length}`);

            for (let i = 0; (i < body.length && i < 6); i++) {

                switch (body[i]['type']) {
                    case 'CreateEvent':
                        this.events.push(new CreateEvent(body[i]));
                        break;
                    case 'DeleteEvent':
                        break;
                    case 'IssuesEvent':
                        this.events.push(new IssuesEvent(body[i]));
                        break;
                    case 'IssuesCommentEvent':
                        break;
                    case 'PushEvent':
                        this.events.push(new PushEvent(body[i]));
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
        id: String,
        msg: String,
        url: String
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

        console.log(this.message);
    }

}


export class PushEvent extends GithubEventData {
    commits: Array<GithubCommit> = [];

    constructor (
        instance: Object
    ) {
        super(instance);
        const payload = instance['payload'];
        const commits: Array<Object> = [];

        this.message = `Thomas pushed to ${this.getBranch(payload['ref'])} at ${this.Repo}`;
        console.log(this.message);

        for (let c = 0; c < payload['commits'].length; c++) {
            const ID =  payload['commits'][c]['sha'].slice(0, 6);
            const Message =  payload['commits'][c]['message'];
            const URL = payload['commits'][c]['url'];

            const newCommit: GithubCommit = new GithubCommit(ID, Message, URL);
            commits.push(new GithubCommit(ID, Message, URL));

            console.log(`   ${new GithubCommit(ID, Message, URL).OutputMsg}`);
        }

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
        instance: Object
    ) {
        super(instance);
        const payload = instance['payload'];

        this.message = `Thomas ${payload['action']} an issue in ${instance['repo']['name']}`;
        this.issueTitle = payload['issue']['title'];
        this.issueText = payload['issue']['body'];
        this.issueUrl = payload['issue']['url'];

        console.log(this.message);
        console.log(`   ${this.issueTitle}\n    ${this.issueText}`);
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
