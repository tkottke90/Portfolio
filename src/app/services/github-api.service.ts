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
                        this.events.push(new CreateEvent(dat.Timestamp, dat.Repo));
                        break;
                    case 'DeleteEvent':
                        break;
                    case 'IssuesEvent':
                        this.events.push(
                            new IssuesEvent(dat.Timestamp,
                                            dat.Repo, body[i]['action'],
                                            body[i]['issue']['title'],
                                            body[i]['issue']['url']));
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
                        this.events.push(new PushEvent(dat.Timestamp, dat.Repo, body[i]['payload']['ref'].split('/')[2], commits));
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
    message: String;


    constructor (
        d: Date,
        r: String
    ) {
        this.Date = d;
        this.Repo = r;
    }
}


class CreateEvent extends GithubEventData {
    constructor (
        date: Date,
        repo: String
    ) {
        super(date, repo);
        this.message = `Thomas created new repo called ${repo.split('/')[1]}`;

        console.log(this.message);
    }

}



class PushEvent extends GithubEventData {
    commits: Array<String> = [];

    constructor (
        date: Date,
        repo: String,
        branch: String,
        com: Array<Object>
    ) {
        super(date, repo);
        this.message = `Thomas pushed to ${branch} at ${repo}`;
        console.log(this.message);
        for (const c of com) {
            this.commits.push(`${c['ID']} ${c['Message']}`);
            console.log(`    ${c['ID']} ${c['Message']}`);
        }
    }

}

class IssuesEvent extends GithubEventData {
    constructor (
        date: Date,
        repo: String,
        action: String,
        title: String,
        url: String
    ) {
        super(date, repo);
    }

}

class DeleteEvent extends GithubEventData {
    constructor (
        date: Date,
        repo: String
    ) {
        super(date, repo);
    }

}

class WatchEvent extends GithubEventData {
    constructor (
        date: Date,
        repo: String
    ) {
        super(date, repo);
    }

}
