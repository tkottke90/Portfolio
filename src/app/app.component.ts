import { Component, OnInit } from '@angular/core';
import { FirestoreService, Project } from './services/firestore.service';
import { OverlayManagerService } from './services/overlay-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  overlayEnabled = false;

  constructor(private AF: FirestoreService, private oms: OverlayManagerService ) {
  }

  ngOnInit () {

  }

}
