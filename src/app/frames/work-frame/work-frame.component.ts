import { Component, OnInit, transition, trigger, state, style, animate } from '@angular/core';
import { transformMenu } from '@angular/material';

import { ProjectDisplayService } from '../../services/project.display';
import { Project } from '../../services/firestore.service';

@Component({
    selector: 'app-work-frame',
    templateUrl: './work-frame.component.html',
    styleUrls: [ './work-frame.component.scss' ],
    animations: [
        trigger('LeftPanel', [
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            state('inactive', style({
                transform: 'translateX(-100%)',
                opacity: 0
            })),
            transition('inactive => active', animate('250ms ease-in')),
            transition('active => inactive', animate('250ms ease-out'))
        ]),
        trigger('RightPanel', [
            state('active', style({
                transform: 'translateX(-100%)',
                opacity: 1
            })),
            state('inactive', style({
                transform: 'translateX(100%)',
                opacity: 0
            })),
            transition('inactive => active', animate('250ms ease-in')),
            transition('active => inactive', animate('250ms ease-out'))
        ])
    ]
})
export class WorkFrameComponent implements OnInit {

    leftPanel = 'active';
    rightPanel = 'inactive';

    selectedProject: Project = null;
    processType = '';
    processKeys = [];

    constructor(private pds: ProjectDisplayService) {}

    ngOnInit() {
        this.pds.project.subscribe(
            (project) => {
                this.selectedProject = project;
                if (this.selectedProject !== null) {
                    this.viewRight();
                    this.processType = typeof this.selectedProject.Details.Process;
                    console.log(this.selectedProject.Details.Process);
                } else {
                    this.viewLeft();
                }

            },
            (error) => {
                // TO-DO #1 (Logging)
                console.log(`Subscription Error: ${error}`);
            }
        );
    }

    toggleView() {
        this.leftPanel = this.leftPanel === 'active' ? 'inactive' : 'active';
        this.rightPanel = this.rightPanel === 'active' ? 'inactive' : 'active';
    }

    viewLeft() {
        this.leftPanel = 'active';
        this.rightPanel = 'inactive';
    }

    viewRight() {
        this.leftPanel = 'inactive';
        this.rightPanel = 'active';
    }

}

