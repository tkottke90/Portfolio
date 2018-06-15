import { Component, OnInit, OnChanges, trigger, state, style, transition, animate } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { OverlayManagerService } from '../../services/overlay-manager.service';

@Component({
  selector: 'app-image-overlay',
  templateUrl: './image-overlay.component.html',
  styleUrls: ['./image-overlay.component.scss'],
  animations: [
    trigger('ImageCarrossel', [
      state('left', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      state('center', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('right', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('left => right', animate('5ms')),
      transition('left => center', animate('250ms ease-in')),
      transition('right => left', animate('5ms')),
      transition('right => center', animate('250ms ease-in')),
      transition('center => left', animate('250ms ease-out')),
      transition('center => right', animate('250ms ease-out'))
    ])
  ]
})
export class ImageOverlayComponent implements OnInit, OnChanges {

  images: string[];

  imgStates = ['left', 'center', 'right'];
  imgPanelA = 1;
  imgPanelB = 2;
  imgPanelC = 0;

  imgIndex = 0;

  ColorA = 0;
  ColorB = 0;
  ColorC = 0;


  constructor(public oms: OverlayManagerService) { }

  ngOnInit() {

    this.oms.displayImages.subscribe(
      next => { 
        this.images = next;
        this.imgIndex = 0;
        this.ColorA = this.imgIndex;
        this.ColorB = this.imgIndex + 1;
        this.ColorC = this.images ? this.images.length - 1 : 0;
      }
    );
  }

  ngOnChanges() {
    this.ColorA = this.imgIndex;
    this.ColorB = this.imgIndex + 1;
    this.ColorC = this.images ? this.images.length - 1 : 0;
  }


  imgScroll(moveNext: boolean) {
    if (moveNext) {
      this.imgIndex = this.imgIndex >= (this.images.length - 1) ? 0 : this.imgIndex + 1;

      if (this.imgPanelA <= 0) {
        this.imgPanelA = 2;
        this.ColorA = (this.imgIndex + 1) >= (this.images.length) ? 0 : this.imgIndex + 1;
      } else {
        this.imgPanelA--;
      }

      if (this.imgPanelB <= 0) {
        this.imgPanelB = 2;
        this.ColorB = (this.imgIndex + 1) >= (this.images.length) ? 0 : this.imgIndex + 1;
      } else {
        this.imgPanelB--;
      }

      if (this.imgPanelC <= 0) {
        this.imgPanelC = 2;
        this.ColorC = (this.imgIndex + 1) >= (this.images.length) ? 0 : this.imgIndex + 1;
      } else {
        this.imgPanelC--;
      }
    } else {
      this.imgIndex = this.imgIndex <= 0 ? (this.images.length - 1) : this.imgIndex - 1;

      if (this.imgPanelA >= 2) {
        this.imgPanelA = 0;
        this.ColorA = (this.imgIndex - 1) <= -1 ? (this.images.length - 1) : this.imgIndex - 1;
      } else {
        this.imgPanelA++;
      }

      if (this.imgPanelB >= 2) {
        this.imgPanelB = 0;
        this.ColorB = (this.imgIndex - 1) <= -1 ? (this.images.length - 1) : this.imgIndex - 1;
      } else {
        this.imgPanelB++;
      }

      if (this.imgPanelC >= 2) {
        this.imgPanelC = 0;
        this.ColorC = (this.imgIndex - 1) <= -1 ? (this.images.length - 1) : this.imgIndex - 1;
      } else {
        this.imgPanelC++;
      }
    }
  }
}
