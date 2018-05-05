import { Component, Input, SecurityContext } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GithubCommit } from '../../services/github-api.service';

@Component({
    selector: 'app-github-commit',
    templateUrl: './github-commit.component.html',
    styleUrls: [ './github-commit.component.scss' ]
})
export class CommitComponent {
    messageHTML: SafeHtml;

    @Input() avatar: string;
    @Input()
    set commit(commit: GithubCommit ) {
        console.log(commit.OutputMsg);
        this.messageHTML = this.sanitizer.sanitize(SecurityContext.HTML, commit['OutputMsg']);
        console.log(this.messageHTML);
    }
   /*  @Input() message(message: string) {
        console.log(message);
        this.messageHTML = this.sanitizer.sanitize(SecurityContext.HTML, message);
    } */

    constructor(private sanitizer: DomSanitizer) {}

}
