import { Component, OnInit } from '@angular/core';
import { FirestoreService, Project } from './services/firestore.service';
import { ProjectDisplayService } from './services/project.display';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  overlay: boolean;

  scrollTop = true;

  constructor(
    private AF: FirestoreService,
    private pd: ProjectDisplayService
  ) { }

  ngOnInit() {
    this.pd.imageOverlayEnabled.subscribe({
      next: (vis) => {
        this.overlay = vis;
      }
    });
  }

  onScroll() {
    this.scrollTop = window.pageYOffset < 200;
    console.log(window.pageYOffset < 200);

    if (this.scrollTop) { console.log('At Top of Page'); }
  }

}
