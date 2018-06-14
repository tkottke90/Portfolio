import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class OverlayManagerService {

  displayImages: BehaviorSubject<string[] | null> = new BehaviorSubject<string[] | null>(null);
  displayOverlay: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }


  showOverlay() {
    if (this.displayImages) {
      this.displayOverlay.next(true);
    }
  }

  hideOverlay() {
    this.displayOverlay.next(false);
  }
}
