import { Component, Input, SecurityContext } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GithubCommit } from '../../services/github-api.service';

@Component({
    selector: 'app-github-comment',
    templateUrl: './github-comment.component.html',
    styleUrls: [ './github-comment.component.scss' ]
})
export class CommentComponent {
    messageHTML: SafeHtml;

    @Input() avatar: string;
    @Input()
    set comment(comment: GithubCommit ) {
        this.messageHTML = this.sanitizer.sanitize(SecurityContext.HTML, commit['OutputMsg']);
    }

    constructor(private sanitizer: DomSanitizer) {}

}
