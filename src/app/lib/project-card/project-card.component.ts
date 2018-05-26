import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../services/firestore.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input()
  set project (project: Project) {

  }

  constructor() { }

  ngOnInit() {
  }

}
