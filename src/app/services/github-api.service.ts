import { Injectable } from '@angular/core';
import * as Github from 'octonode';

enum EventType {
    Create,
    Delete,
    Issues,
    Push,
    Watch
}

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


                const dat = {
                    'Timestamp': body[i]['created_at'],
                    'Repo': body[i]['repo']['name'],
                };

                switch (body[i]['type']) {
                    case 'CreateEvent':
                        this.events.push(new CreateEvent(dat.Timestamp, dat.Repo, body[i]));
                        break;
                    case 'DeleteEvent':
                        break;
                    case 'IssuesEvent':
                        this.events.push(
                            new IssuesEvent(dat.Timestamp,
                                            dat.Repo, body[i]['action'],
                                            body[i]['issue']['title'],
                                            body[i]['issue']['url'],
                                            body[i]));
                        break;
                    case 'PushEvent':
                        const commits: Array<Object> = [];
                        const cmtArr = body[i]['payload']['commits'];

                        for (let j = 0; j < cmtArr.length; j++) {
                            const commitObj = {
                                'ID': cmtArr[j]['sha'].slice(0, 6),
                                'Message': cmtArr[j]['message'],
                                'URL': cmtArr[j]['url'],
                            };

                            commits.push(commitObj);
                        }
                        this.events.push(new PushEvent(dat.Timestamp, dat.Repo, body[i]['payload']['ref'].split('/')[2], commits, body[i]));
                        break;
                    case 'WatchEvent':
                        break;
                }
            }
          });
    }
}

class GithubEventData {
    Date: Date;
    Repo: String;
    objectInstance: Object;

    message: String;


    constructor (
        d: Date,
        r: String,
        o: Object
    ) {
        this.Date = d;
        this.Repo = r;
        this.objectInstance = o;
    }
}


class CreateEvent extends GithubEventData {
    constructor (
        date: Date,
        repo: String,
        instance: Object
    ) {
        super(date, repo, instance);
        this.message = `Thomas created new repo called ${repo.split('/')[1]}`;
        this.objectInstance = instance;

        console.log(this.message);
    }

}



class PushEvent extends GithubEventData {
    commits: Array<String> = [];

    constructor (
        date: Date,
        repo: String,
        branch: String,
        com: Array<Object>,
        instance: Object
    ) {
        super(date, repo, instance);
        this.message = `Thomas pushed to ${branch} at ${repo}`;
        console.log(this.message);
        for (const c of com) {
            this.commits.push(`${c['ID']} ${c['Message']}`);
            console.log(`    ${c['ID']} ${c['Message']}`);
        }
    }

}

class IssuesEvent extends GithubEventData {
    issueTitle: String = '';
    issueText: String = '';

    issueUrl: String = '';

    constructor (
        date: Date,
        repo: String,
        action: String,
        url: String,
        instance: Object
    ) {
        super(date, repo, instance);
        const issue = instance['issue'];

        this.message = `Thomas ${issue['action']} an issue in ${instance['repository']['name']}`;
        this.issueTitle = issue['title'];
        this.issueText = issue['body'];
        this.issueUrl = issue['url'];

        console.log(this.message);
    }

}

class DeleteEvent extends GithubEventData {
    constructor (
        date: Date,
        repo: String,
        instance: Object
    ) {
        super(date, repo, instance);
    }

}

class WatchEvent extends GithubEventData {
    constructor (
        date: Date,
        repo: String,
        instance: Object
    ) {
        super(date, repo, instance);
    }

}
