import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

import { MatSnackBar } from '@angular/material';

class ConactMessage {
  constructor(
    public name: string,
    public email: string,
    public phone: string | '',
    public message: string
  ) {}
}
@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss']
})
export class ContactViewComponent implements OnInit {

  model = new ConactMessage('', '', '', '');
  submitted = false;

  constructor(
    private fs: FirestoreService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
  }


  onSubmit() {
    this.submitted = true;

    this.fs.AFstore.collection('messages').add({
      name: this.model.name,
      email: this.model.email,
      phone: this.model.phone,
      message: this.model.message
    }).then(() => {
          const snackBarRef = this.snackBar.open('Message Sent', 'Dismiss' , { duration: 2000});
          snackBarRef.onAction().subscribe(() => {
            this.snackBar.dismiss();
          });
        })
        .catch((err) => {
          // TO-DO #1 (Logging)
        });
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
