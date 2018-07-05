import { RouterModule, Routes} from '@angular/router';
import { AboutViewComponent } from '../frames/frame-about/about-view.component';
import { WorkViewComponent } from '../frames/work-view/work-view.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: 'about', component: AboutViewComponent },
    { path: 'work', component: WorkViewComponent },
    { path: 'content', component: AboutViewComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
