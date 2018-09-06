import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCreateReportComponent } from './student-create-report.component';

describe('StudentCreateReportComponent', () => {
  let component: StudentCreateReportComponent;
  let fixture: ComponentFixture<StudentCreateReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentCreateReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCreateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
