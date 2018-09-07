import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDetailReportComponent } from './student-detail-report.component';

describe('StudentReportComponent', () => {
  let component: StudentDetailReportComponent;
  let fixture: ComponentFixture<StudentReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDetailReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
