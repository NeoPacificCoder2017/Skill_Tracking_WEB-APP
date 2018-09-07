import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileStudentComponent } from './admin-profile-student.component';

describe('AdminProfileStudentComponent', () => {
  let component: AdminProfileStudentComponent;
  let fixture: ComponentFixture<AdminProfileStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProfileStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
