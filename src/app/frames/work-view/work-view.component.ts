import { Component, OnInit, transition, trigger, state, style, animate } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ProjectDisplayService } from '../../services/project.display';
import { Project, FirestoreService } from '../../services/firestore.service';

@Component({
    selector: 'app-work-view',
    templateUrl: './work-view.component.html',
    styleUrls: [ './work-view.component.scss' ],
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
export class WorkViewComponent implements OnInit {

    leftPanel = 'active';
    rightPanel = 'inactive';

    selectedProject: Project = null;
    processType = '';

    iconKeys = [];

    userUrl = '';

    constructor(
        private pds: ProjectDisplayService,
        private router: Router,
        private firestore: FirestoreService
    ) {
        this.pds.project.subscribe(
            (project) => {
                this.selectedProject = project;
                if (this.selectedProject !== null) {
                    this.viewRight();
                    this.processType = typeof this.selectedProject.Details.Process;
                    this.iconKeys = Object.keys(this.selectedProject.Icons);
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } else {
                    this.viewLeft();
                }

            },
            (error) => {
                // TO-DO #1 (Logging)
                console.log(`Subscription Error: ${error}`);
            }
        );

        this.router.events.subscribe(async (event) => {
            if (event instanceof NavigationEnd ) {
                this.userUrl = event.url;
                if (event.url === '/work') {
                    this.viewLeft();
                } else if ( event.url.includes('/projects/') ) {
                    const projID = event.url.slice(10);
                    console.log(projID);
                    this.viewRight();
                    await this.firestore.getData().then((data) => {
                        this.pds.project.next(
                            data.find((element) => {
                                return element.firebaseID.includes(projID);
                            })
                        );
                    });
                }
            }
        });
    }

    ngOnInit() { }

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

