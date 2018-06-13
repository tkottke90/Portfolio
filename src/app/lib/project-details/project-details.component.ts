import { Component, OnInit, Input, OnChanges, trigger, state, transition, style, animate } from '@angular/core';
import { Project } from '../../services/firestore.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
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
export class ProjectDetailsComponent implements OnInit, OnChanges {

  @Input() selectedProject: Project;

  imgStates = ['left', 'center', 'right'];
  imgPanelA = 1;
  imgPanelB = 2;
  imgPanelC = 0;

  imgIndex = 0;

  ColorA = 0;
  ColorB = 1;
  ColorC = 4;

  iconKeys = [];

  constructor() { }

  ngOnInit() {


    this.ColorA = this.imgIndex;
    this.ColorB = this.imgIndex + 1;
    this.ColorC = this.selectedProject.Images.length - 1;

  }

  ngOnChanges() {
    this.iconKeys = Object.keys(this.selectedProject.Icons);
}

  imgScroll(moveNext: boolean) {
    if (moveNext) {
      this.imgIndex = this.imgIndex >= (this.selectedProject.Images.length - 1) ? 0 : this.imgIndex + 1;

      if (this.imgPanelA <= 0) {
        this.imgPanelA = 2;
        this.ColorA = (this.imgIndex + 1) >= (this.selectedProject.Images.length) ? 0 : this.imgIndex + 1;
      } else {
        this.imgPanelA--;
      }

      if (this.imgPanelB <= 0) {
        this.imgPanelB = 2;
        this.ColorB = (this.imgIndex + 1) >= (this.selectedProject.Images.length) ? 0 : this.imgIndex + 1;
      } else {
        this.imgPanelB--;
      }

      if (this.imgPanelC <= 0) {
        this.imgPanelC = 2;
        this.ColorC = (this.imgIndex + 1) >= (this.selectedProject.Images.length) ? 0 : this.imgIndex + 1;
      } else {
        this.imgPanelC--;
      }
    } else {
      this.imgIndex = this.imgIndex <= 0 ? (this.selectedProject.Images.length - 1) : this.imgIndex - 1;

      if (this.imgPanelA >= 2) {
        this.imgPanelA = 0;
        this.ColorA = (this.imgIndex - 1) <= -1 ? (this.selectedProject.Images.length - 1) : this.imgIndex - 1;
      } else {
        this.imgPanelA++;
      }

      if (this.imgPanelB >= 2) {
        this.imgPanelB = 0;
        this.ColorB = (this.imgIndex - 1) <= -1 ? (this.selectedProject.Images.length - 1) : this.imgIndex - 1;
      } else {
        this.imgPanelB++;
      }

      if (this.imgPanelC >= 2) {
        this.imgPanelC = 0;
        this.ColorC = (this.imgIndex - 1) <= -1 ? (this.selectedProject.Images.length - 1) : this.imgIndex - 1;
      } else {
        this.imgPanelC++;
      }
    }
  }
}
