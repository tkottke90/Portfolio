import { Component, OnInit } from '@angular/core';
import { FirestoreService, Project } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

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
