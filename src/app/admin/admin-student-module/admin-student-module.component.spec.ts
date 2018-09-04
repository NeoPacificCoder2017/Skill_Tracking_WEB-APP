import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStudentModuleComponent } from './admin-student-module.component';

describe('AdminStudentModuleComponent', () => {
  let component: AdminStudentModuleComponent;
  let fixture: ComponentFixture<AdminStudentModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminStudentModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStudentModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
