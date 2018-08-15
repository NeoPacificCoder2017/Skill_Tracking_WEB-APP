import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormationTeacherComponent } from './admin-formation-teacher.component';

describe('AdminFormationTeacherComponent', () => {
  let component: AdminFormationTeacherComponent;
  let fixture: ComponentFixture<AdminFormationTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormationTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormationTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
