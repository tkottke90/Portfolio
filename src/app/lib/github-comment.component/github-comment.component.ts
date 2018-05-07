import { Component, Input, SecurityContext } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GithubCommit } from '../../services/github-api.service';

@Component({
    selector: 'app-github-comment',
    templateUrl: './github-comment.component.html',
    styleUrls: [ './github-comment.component.scss', './github-comment.component.mobile.scss' ]
})
export class CommentComponent {
    messageHTML: SafeHtml;

    @Input() avatar: string;
    @Input() comment: string;

    constructor(private sanitizer: DomSanitizer) {}

}
