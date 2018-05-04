import { Component, OnInit } from '@angular/core';
import { GithubApiService, GithubEventData } from './services/github-api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
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
