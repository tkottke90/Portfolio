import { Component, OnInit } from '@angular/core';
import { FirestoreService, Project } from './services/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private AF: FirestoreService ) {
  }

}
