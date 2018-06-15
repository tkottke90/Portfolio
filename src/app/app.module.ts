// Frameworks
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';

import { AngularFireModule } from 'angularfire2';

// Framework Components

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
  MatTableModule,
  MatToolbarModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatStepperModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatNativeDateModule} from '@angular/material';

// Custom Components
import { AppComponent } from './app.component';
import { GithubEventComponent } from './lib/github-event.component/github-event.component';
import { CommitComponent } from './lib/github-commit.component/github-commit.component';
import { CommentComponent } from './lib/github-comment.component/github-comment.component';
import { GithubFeedComponent } from './lib/github-feed/github-feed.component';
import { ProjectContainerComponent } from './lib/project-container/project-container.component';
import { ProjectCardComponent } from './lib/project-card/project-card.component';
<<<<<<< HEAD
import { WorkFrameComponent } from './frames/work.frame.component/work.frame.component';
=======
import { ProjectDetailsComponent } from './lib/project-details/project-details.component';
>>>>>>> 691c224b284afe12eb3b3d1d9c712df576835de4

// Frames
import { WorkViewComponent } from './frames/work-view/work-view.component';

// Custom Services
import { GithubApiService } from './services/github-api.service';
import { FirestoreService } from './services/firestore.service';
import { ProjectDisplayService } from './services/project.display';

@NgModule({
  declarations: [
    AppComponent,
    CommentComponent,
    CommitComponent,
    GithubEventComponent,
    GithubFeedComponent,
    ProjectContainerComponent,
    ProjectCardComponent,
<<<<<<< HEAD
    WorkFrameComponent
=======
    WorkViewComponent,
    ProjectDetailsComponent
>>>>>>> 691c224b284afe12eb3b3d1d9c712df576835de4
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
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
    MatTableModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatNativeDateModule
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
