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
    console.log(`ngOnInit Fired`);
    await this.ghapi.getActivity().then( () => {
      this.ghapi.events.subscribe({
        next: (v) => this.events = v
      });
    }).catch( err => console.error(err) );
  }

}
