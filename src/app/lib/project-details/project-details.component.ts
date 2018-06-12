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

  imgStates = ['center', 'left', 'right'];
  imgPanelA = 0;
  imgPanelB = 1;
  imgPanelC = 2;


  iconKeys = [];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.iconKeys = Object.keys(this.selectedProject.Icons);
  }

  imgScroll(moveNext: boolean) {
    if (moveNext) {
      this.imgPanelA >= 2 ? this.imgPanelA = 0 : this.imgPanelA++;
      this.imgPanelB >= 2 ? this.imgPanelB = 0 : this.imgPanelB++;
      this.imgPanelC >= 2 ? this.imgPanelC = 0 : this.imgPanelC++;

    } else {
      this.imgPanelA <= 0 ? this.imgPanelA = 2 : this.imgPanelA--;
      this.imgPanelB <= 0 ? this.imgPanelB = 2 : this.imgPanelB--;
      this.imgPanelC <= 0 ? this.imgPanelC = 2 : this.imgPanelC--;
    }
  }

}
