import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubFeedComponent } from './github-feed.component';

describe('GithubFeedComponent', () => {
  let component: GithubFeedComponent;
  let fixture: ComponentFixture<GithubFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GithubFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
