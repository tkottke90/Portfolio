import { Component, trigger, state, style, animate, transition } from '@angular/core';

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
            })),
            state('inactive', style({
                transform: 'translateX(100%)',
                
            })),
            transition('active => inactive', animate('500ms ease-in-out')),
            transition('inactive => active', animate('500ms ease-in-out'))
        ]),
    ]
})
export class WorkFrameComponent {

    panelA = 'active';
    panelB = 'inactive';


    toggleView() {
        this.panelA = this.panelA == 'active' ? 'inactive' : 'active';
        this.panelB = this.panelB == 'active' ? 'inactive' : 'active';
    }

    viewDetails(details: Project) {

    }
}
