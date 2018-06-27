import {
    Component,
    OnInit
} from '@angular/core';
import { ProjectDisplayService } from '../../services/project.display';

@Component({
    selector: 'app-overlay-view',
    templateUrl: './overlay-view.component.html',
    styleUrls: [ './overlay-view.component.scss' ],
    animations: []
})
export class OverlayViewComponent implements OnInit {

    // images: string[];

    images = [
        '../../../assets/a-computer-on-a-white-desk-in-a-forest-sweden-BAAR61.jpg'
        ,'../../../assets/discord.png'
    ];

    constructor(
        private pd: ProjectDisplayService
    ) {}

    ngOnInit() {
        this.pd.project.subscribe({
            next: (project) => {
                this.images = project.Images;
            },
            error: (error) => {
                // TO-DO #1 (Logging)
            }
        });
    }

}
