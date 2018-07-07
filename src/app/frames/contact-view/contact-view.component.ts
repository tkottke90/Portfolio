import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';

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

  model = new ConactMessage('test', 'test@example.com', '123-456-7890', 'This is my message');
  submitted = false;

  constructor(private fs: FirestoreService) {}

  ngOnInit() {
  }


  onSubmit() {
    this.submitted = true;
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
