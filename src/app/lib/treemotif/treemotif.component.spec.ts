import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreemotifComponent } from './treemotif.component';

describe('TreemotifComponent', () => {
  let component: TreemotifComponent;
  let fixture: ComponentFixture<TreemotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreemotifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreemotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
