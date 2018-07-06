import { Injectable, ElementRef } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Project } from './firestore.service';

@Injectable()
export class ProjectDisplayService {
    project: BehaviorSubject<Project | null> = new BehaviorSubject<Project |null>(null);
    imageOverlayEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    lockToolbar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    toolbarTransparent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor(
        private router: Router
    ) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                switch (event.url) {
                    case '/work':
                    case '/contact':
                        this.toolbarTransparent.next(false);
                        this.lockToolbar.next(true);
                        break;
                    case '/about':
                        this.toolbarTransparent.next(true);
                        this.lockToolbar.next(false);
                        break;
                }

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                  });
            }
        });
    }
}
