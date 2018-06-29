import { Component, OnInit } from '@angular/core';
import { GithubApiService, GithubEventData } from '../../services/github-api.service';

@Component({
  selector: 'app-github-feed',
  templateUrl: './github-feed.component.html',
  styleUrls: ['./github-feed.component.scss']
})
export class GithubFeedComponent implements OnInit {

  events: Array<GithubEventData>;

  constructor(private ghapi: GithubApiService) { }

  async ngOnInit () {
    this.ghapi.events.subscribe({
      next: (v) => this.events = v
    });
    await this.ghapi.getActivity().catch( err => console.error(err) );
  }

}
