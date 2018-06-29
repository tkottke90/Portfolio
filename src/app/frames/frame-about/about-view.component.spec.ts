import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameAboutComponent } from './about-view.component';

describe('FrameAboutComponent', () => {
  let component: FrameAboutComponent;
  let fixture: ComponentFixture<FrameAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
