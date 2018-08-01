import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFormationStudentComponent } from './admin-formation-student.component';

describe('AdminFormationStudentComponent', () => {
  let component: AdminFormationStudentComponent;
  let fixture: ComponentFixture<AdminFormationStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFormationStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFormationStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
