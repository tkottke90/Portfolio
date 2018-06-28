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

    images: string[];

    constructor(
        private pd: ProjectDisplayService
    ) {}

    ngOnInit() {
        this.pd.project.subscribe({
            next: (project) => {
                this.images = project.Images;
                console.log(this.images);
            },
            error: (error) => {
                // TO-DO #1 (Logging)
            }
        });
    }

}
