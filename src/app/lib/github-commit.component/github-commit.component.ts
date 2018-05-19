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
        this.messageHTML = this.sanitizer.sanitize(SecurityContext.HTML, commit['OutputMsg']);
    }

    constructor(private sanitizer: DomSanitizer) {}

}
