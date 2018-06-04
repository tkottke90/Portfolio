import { Component, trigger, state, style, animate, transition } from '@angular/core';

import { Project, NewProject } from '../../services/firestore.service';
import { ProjectDisplayService } from '../../services/project.display';

@Component({
    selector: 'app-work-frame',
    templateUrl: './work.frame.component.html',
    styleUrls: [ './work.frame.component.scss' ],
    animations: [
        trigger('PanelAStates', [
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            state('inactive', style({
                transform: 'translateX(-100%)',
                opacity: 0
            })),
            transition('active => inactive', animate('500ms ease-in-out')),
            transition('inactive => active', animate('500ms ease-in-out'))
        ]),
        trigger('PanelBStates', [
            state('active', style({
                transform: 'translateX(0)',
                opacity: 1
            })),
            state('inactive', style({
                transform: 'translateX(100%)',
                opacity: 0
            })),
            transition('active => inactive', animate('500ms ease-in-out')),
            transition('inactive => active', animate('500ms ease-in-out'))
        ]),
    ]
})
export class WorkFrameComponent {

    panelA = 'active';
    panelB = 'inactive';

    selectedProject: Project;

    constructor(private pds: ProjectDisplayService) {
        pds.project.subscribe(
            nextProject => {
                this.selectedProject = nextProject;
                this.setView(nextProject === null);
            },
            err => {
                console.log(`Error in pds subscription [Work.Frame.Component]\n${err}`);
                pds.project.unsubscribe();
            });
    }

    toggleView() {
        this.panelA = this.panelA === 'active' ? 'inactive' : 'active';
        this.panelB = this.panelB === 'active' ? 'inactive' : 'active';
    }

    setView(pA: boolean) {
        this.panelA = pA ? 'active' : 'inactive';
        this.panelB = pA ? 'inactive' : 'active';
    }
}
