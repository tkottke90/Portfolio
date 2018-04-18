import { Component } from '@angular/core';
import { GithubApiService } from './services/github-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private ghapi: GithubApiService) {
    ghapi.getActivity();
  }
}
