import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Project } from './firestore.service';

@Injectable()
export class ProjectDisplayService {
    project: BehaviorSubject<Project | null> = new BehaviorSubject<Project |null>(null);
    imageOverlayEnabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    lockToolbar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    toolbarTransparent: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
}
