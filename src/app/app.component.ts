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

  lockToolbar = false;
  scrollTop = true;

  constructor(
    private AF: FirestoreService,
    private pd: ProjectDisplayService,
  ) { }

  ngOnInit() {
    this.pd.imageOverlayEnabled.subscribe({
      next: (vis) => {
        this.overlay = vis;
      }
    });

    this.pd.toolbarTransparent.subscribe({
      next: (bool) => this.scrollTop = bool
    });

    this.pd.lockToolbar.subscribe({
      next: (bool) => this.lockToolbar = bool
    });
  }

  onScroll() {
    if (!this.lockToolbar) {
      this.pd.toolbarTransparent.next(window.pageYOffset < 200);
    }
  }

  setLockToolbar(lock: boolean) {
    this.pd.toolbarTransparent.next(!lock);
    this.pd.lockToolbar.next(lock);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


}
