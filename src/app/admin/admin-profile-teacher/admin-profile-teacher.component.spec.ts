import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileTeacherComponent } from './admin-profile-teacher.component';

describe('AdminProfileTeacherComponent', () => {
  let component: AdminProfileTeacherComponent;
  let fixture: ComponentFixture<AdminProfileTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProfileTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
