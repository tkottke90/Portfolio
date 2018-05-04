import { Component, OnInit } from '@angular/core';
import { GithubApiService, GithubEventData } from './services/github-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  events: Array<GithubEventData>;

  constructor(private ghapi: GithubApiService) { }

  async OnInit () {
    await this.ghapi.getActivity();
    console.log(`Github API Event Count: ${this.ghapi.events.length}`);
    this.events = this.ghapi.events;
  }
}
