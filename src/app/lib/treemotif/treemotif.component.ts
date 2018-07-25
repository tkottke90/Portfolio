import { Component, OnInit, ViewChild } from '@angular/core';

enum Seasons {
  Spring,
  Summer,
  Fall,
  Winter
}

@Component({
  selector: 'app-treemotif',
  templateUrl: './treemotif.component.html',
  styleUrls: ['./treemotif.component.scss']
})
export class TreemotifComponent implements OnInit {

  sdates = [];

  season: Seasons;

  constructor() {
    this.season = Seasons.Spring;
    this.getDates();
    console.log(this.sdates);
    this.setSeason();
  }

  ngOnInit() {
  }

  getDates() {
    const now = new Date();
    this.sdates.push(new Date(now.getFullYear(), 3, 20));
    this.sdates.push(new Date(now.getFullYear(), 6, 21));
    this.sdates.push(new Date(now.getFullYear(), 9, 22));
    this.sdates.push(new Date(now.getFullYear(), 12, 21));
  }

  setSeason() {

    const now = new Date();
    for (let i = 3; i > 0; i--) {
      console.log(now.getTime());
      console.log(this.sdates[i].getTime());
      if (now.getTime() > this.sdates[i].getTime()) {
        this.season = i;
        break;
      }
    }
  }

}
