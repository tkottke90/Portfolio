import { Component, OnInit } from '@angular/core';
import { GithubApiService, GithubEventData, GHAPIError } from '../../services/github-api.service';

@Component({
  selector: 'app-github-feed',
  templateUrl: './github-feed.component.html',
  styleUrls: ['./github-feed.component.scss']
})
export class GithubFeedComponent implements OnInit {

  events: Array<GithubEventData>;
  apiError: GHAPIError = new GHAPIError(true);

  constructor(private ghapi: GithubApiService) { }

  async ngOnInit () {
    this.ghapi.events.subscribe({
      next: (v) => this.events = v
    });
    this.ghapi.ServiceError.subscribe({
      next: (n) => this.apiError = n
    });
    await this.ghapi.getActivity().catch( err => console.error(err) );
  }

}
