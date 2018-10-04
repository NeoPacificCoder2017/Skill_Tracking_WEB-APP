import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherReportDetailComponent } from './teacher-report-detail.component';

describe('TeacherReportDetailComponent', () => {
  let component: TeacherReportDetailComponent;
  let fixture: ComponentFixture<TeacherReportDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherReportDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
