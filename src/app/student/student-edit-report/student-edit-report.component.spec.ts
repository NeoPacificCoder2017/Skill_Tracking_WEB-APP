import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentEditReportComponent } from './student-edit-report.component';

describe('StudentEditReportComponent', () => {
  let component: StudentEditReportComponent;
  let fixture: ComponentFixture<StudentEditReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentEditReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentEditReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
