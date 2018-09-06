import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPlanningComponent } from './student-planning.component';

describe('StudentPlanningComponent', () => {
  let component: StudentPlanningComponent;
  let fixture: ComponentFixture<StudentPlanningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPlanningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
