import { RouterModule, Routes} from '@angular/router';
import { AboutViewComponent } from '../frames/frame-about/about-view.component';
import { WorkViewComponent } from '../frames/work-view/work-view.component';
import { ContactViewComponent } from '../frames/contact-view/contact-view.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/about', pathMatch: 'full' },
    { path: 'about', component: AboutViewComponent },
    { path: 'work', component: WorkViewComponent },
    { path: 'work/:project', component: WorkViewComponent },
    { path: 'contact', component: ContactViewComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
