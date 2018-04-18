import { Injectable } from '@angular/core';
import * as Github from 'octonode';

@Injectable()
export class GithubApiService {
    client;
    constructor() {
        this.client = Github.client();
    }

    getActivity() {
        return this.client.get('/users/tkottke90/events', {}, function (err, status, body, headers) {
            console.log(`Type: ${typeof body}\nCount: ${body.length}`);

            for (let i = 0; i < body.length || i < 10; i++) {
                const dat = {
                    'Timestamp': body[i]['created_at'],
                    'Repo': body[i]['repo']['name'],
                    'Event': body[i]['type']
                };

                console.log(dat);
            }
          });
    }
}
