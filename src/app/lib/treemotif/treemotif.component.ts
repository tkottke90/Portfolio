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
    this.season = Seasons.Winter;
    this.getDates();
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
      if (now.getTime() > this.sdates[i].getTime()) {
        this.season = i;
        break;
      }
    }

    if (this.season === 3) {
      this.festiveLights();
    }
  }


  festiveLights() {
    setInterval(() => {
      const node = document.querySelectorAll('circle');
      const rndNode = Math.round(Math.random() * node.length) % node.length;
      node[rndNode].classList.toggle('blink-green');
      setTimeout(() => { node[rndNode].classList.toggle('blink-green'); }, 1500);
    }, 500);

    setInterval(() => {
        const node = document.querySelectorAll('circle');
        const rndNode = Math.round(Math.random() * node.length) % node.length;
        node[rndNode].classList.toggle('blink-red');
        setTimeout(() => { node[rndNode].classList.toggle('blink-red'); }, 1450);
    }, 525);
  }
}
