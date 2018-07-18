import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { 404ViewComponent } from './404-view.component';

describe('404ViewComponent', () => {
  let component: 404ViewComponent;
  let fixture: ComponentFixture<404ViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 404ViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(404ViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
