import { Component, transition, trigger, state, style, animate } from '@angular/core';
import { transformMenu } from '@angular/material';

enum States {
    active,
    inactive
}


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
export class WorkFrameComponent {

    leftPanel = 'active';
    rightPanel = 'inactive';


    toggleView() {
        this.leftPanel = this.leftPanel === 'active' ? 'inactive' : 'active';
        this.rightPanel = this.rightPanel === 'active' ? 'inactive' : 'active';
    }

}

