import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../services/firestore.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project;

  constructor() { }

  ngOnInit() { console.log(this.project.URLs.source); }

  onNavigate(url: string) {
    console.log(`navigate to: `);
  }

}