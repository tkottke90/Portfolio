import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Project } from '../../services/firestore.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnChanges {

  @Input() selectedProject: Project;

  iconKeys = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.iconKeys = Object.keys(this.selectedProject.Icons);
  }

}
