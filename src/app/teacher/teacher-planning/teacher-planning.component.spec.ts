import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherPlanningComponent } from './teacher-planning.component';

describe('TeacherPlanningComponent', () => {
  let component: TeacherPlanningComponent;
  let fixture: ComponentFixture<TeacherPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
