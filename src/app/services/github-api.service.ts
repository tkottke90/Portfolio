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

            for (let i = 0; i < body.length || i < 4; i++) {


                const dat = {
                    'Timestamp': body[i]['created_at'],
                    'Repo': body[i]['repo']['name'],
                };

                switch (body[i]['type']) {
                    case 'CreateEvent':
                        this.events.push(new CreateEvent());
                        break;
                    case 'DeleteEvent':
                        break;
                    case 'IssuesEvent':
                        this.events.push(new IssuesEvent());
                        break;
                    case 'PushEvent':
                        this.events.push(new PushEvent());
                        break;
                    case 'WatchEvent':
                        break;
                }

                console.log(this.events);

                console.log(dat);
            }
          });
    }
}

class GithubEventData {
    Date: Date;
    EventType: EventType;
    Repo: String;
}


class CreateEvent extends GithubEventData {
    Date = new Date();
    EventType = EventType.Create;
    Repo = '';

}

class PushEvent implements GithubEventData {
    Date = new Date();
    EventType = EventType.Push;
    Repo = '';

}

class IssuesEvent implements GithubEventData {
    Date = new Date();
    EventType = EventType.Push;
    Repo = '';

}

class DeleteEvent implements GithubEventData {
    Date = new Date();
    EventType = EventType.Push;
    Repo = '';

}

class WatchEvent implements GithubEventData {
    Date = new Date();
    EventType = EventType.Push;
    Repo = '';

}