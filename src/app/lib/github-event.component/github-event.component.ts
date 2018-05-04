import { Component, Input } from '@angular/core';
import { GithubApiService,
         GithubEventData,
         CreateEvent,
         DeleteEvent,
         IssuesEvent,
         PushEvent,
         WatchEvent } from '../../services/github-api.service';

const eventIcons = {
    Create: 'pencil',
    Comment: 'forum',
    Delete: 'delete-forever',
    Issue: 'clipboard-alert',
    Merge: 'source-merge',
    Push: 'arrow-up-bold-hexagon-outline',
    Watch: 'eye'
};

@Component({
    selector: 'app-github-event',
    templateUrl: './github-event.component.html',
    styleUrls: [ './github-event.component.scss' ]
})
export class GithubEventComponent {
    date: String;
    action_icon: String;
    header: String;

    @Input()
    event (event: GithubEventData) {
        this.date = this.genTimelineStr(new Date(event.Date));
        this.header = event.message;
    }

    genTimelineStr(date: Date): string {
        let diff = Date.now() - date.getTime();

        const days = Math.floor( diff / (1000 * 60 * 60 * 24 ));
        diff -=  days * (1000 * 60 * 60 * 24);
        const hours = Math.floor( diff / (1000 * 60 * 60 ));
        diff -= hours * (1000 * 60 * 60);
        const mins = Math.floor( diff / 1000 * 60 );
        diff -= mins * (1000 * 60);
        const secs = Math.floor( diff / 1000 );
        diff -= secs * (1000);

        if (days > 0) {
            return `about ${days} days ago`;
        } else if (hours > 0) {
            return `about ${hours} hours ago`;
        } else if (mins > 0) {
            return `about ${mins} minutes ago`;
        } else if (secs > 0) {
            return `about ${secs} seconds ago`;
        }
    }
}
