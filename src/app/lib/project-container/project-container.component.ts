import { Component, OnInit} from '@angular/core';
import { FirestoreService, Project } from '../../services/firestore.service';

@Component ({
    selector: 'app-project-container',
    templateUrl: './project-container.component.html',
    styleUrls: [ './project-container.component.scss' ]
})
export class ProjectContainerComponent implements OnInit {
    projects: Project[] = [];

  constructor(private AF: FirestoreService) { }

  ngOnInit () {

    this.AF.projects.subscribe(
      (projects) => {
        this.projects = projects;
        console.log(projects);
      }
    );
   }
}
