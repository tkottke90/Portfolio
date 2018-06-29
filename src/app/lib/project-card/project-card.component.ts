import { Component, OnInit, Input } from '@angular/core';

import { Project } from '../../services/firestore.service';
import { ProjectDisplayService } from '../../services/project.display';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project;


  icons: string[] = [];

  constructor(private pdc: ProjectDisplayService) { }

  ngOnInit() {
    this.icons = Object.keys(this.project.Icons);
  }

  onDetails() {
    this.pdc.project.next(this.project);
  }

}
