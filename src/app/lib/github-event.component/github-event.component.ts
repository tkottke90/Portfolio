import { Component, Input, SecurityContext } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GithubApiService,
         GithubEventData,
         CreateEvent,
         DeleteEvent,
         IssuesEvent,
         PushEvent,
         WatchEvent,
         GithubCommit} from '../../services/github-api.service';

@Component({
    selector: 'app-github-event',
    templateUrl: './github-event.component.html',
    styleUrls: [ './github-event.component.scss', './github-event.component.mobile.scss' ]
})
export class GithubEventComponent {
    date: string;
    action_icon: string;
    event_type: number;
    header: SafeHtml;
    avatar: string;
    commits: Array<GithubCommit> = [];
    moreCommits: SafeHtml;
    comment: string;
    merge_info: Array<string>;

    constructor(private sanitizer: DomSanitizer) {}

    @Input()
    set event (event: GithubEventData) {
        this.date = this.genTimelineStr(new Date(event.Date));
        this.header = this.sanitizer.sanitize(SecurityContext.HTML, event.message);
        this.action_icon = event.action_icon;
        this.event_type = event.type;

        this.avatar = event.objectInstance['actor']['avatar_url'];
        // console.log(`Date: ${this.date}\nIcon: ${this.action_icon}\nHeader: ${this.header}`);

        switch (this.event_type) {
            case 1:
                this.comment = event['comment'];
                break;
            case 5:
                this.commits = event['commits'];
                if (event.objectInstance['payload']['commits'].length > 2) {
                    this.moreCommits = this.sanitizer.sanitize(SecurityContext.HTML,
                        // tslint:disable-next-line:max-line-length
                        `<a href="https://github.com/${event.Repo}/commits/${event['myBranch']}" target="_blank">View Additional ${event.objectInstance['payload']['commits'].length - 2} Commits >></a>`);
                    console.log(this.moreCommits);
                }
                break;
        }
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
