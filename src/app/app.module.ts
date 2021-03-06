// Frameworks
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';

// Framework Components

import { routing } from './routes/routes';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatIconRegistry,
  MatInputModule,
  MatMenuModule,
  MatTableModule,
  MatToolbarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatNativeDateModule,
  MatMenu} from '@angular/material';

// Custom Components
import { AppComponent } from './app.component';
import { GithubEventComponent } from './lib/github-event.component/github-event.component';
import { CommitComponent } from './lib/github-commit.component/github-commit.component';
import { CommentComponent } from './lib/github-comment.component/github-comment.component';
import { GithubFeedComponent } from './lib/github-feed/github-feed.component';
import { ProjectContainerComponent } from './lib/project-container/project-container.component';
import { ProjectCardComponent } from './lib/project-card/project-card.component';
import { ProjectDetailsComponent } from './lib/project-details/project-details.component';
import { TreemotifComponent } from './lib/treemotif/treemotif.component';

// Views
import { WorkViewComponent } from './frames/work-view/work-view.component';
import { OverlayViewComponent } from './frames/overlay-view/overlay-view.component';
import { AboutViewComponent } from './frames/frame-about/about-view.component';

// Custom Services
import { GithubApiService } from './services/github-api.service';
import { FirestoreService } from './services/firestore.service';
import { ProjectDisplayService } from './services/project.display';
import { CarouselDirective } from './directives/carousel.directive';
import { ContactViewComponent } from './frames/contact-view/contact-view.component';
import { FourZeroFourViewComponent } from './frames/404-view/404-view.component';



@NgModule({
  declarations: [
    AppComponent,
    AboutViewComponent,
    CommentComponent,
    CommitComponent,
    GithubEventComponent,
    GithubFeedComponent,
    ProjectContainerComponent,
    ProjectCardComponent,
    WorkViewComponent,
    ProjectDetailsComponent,
    OverlayViewComponent,
    CarouselDirective,
    ContactViewComponent,
    FourZeroFourViewComponent,
    TreemotifComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    routing
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatNativeDateModule
  ],
  providers: [ GithubApiService, FirestoreService, ProjectDisplayService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
 }
}
