import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanningsComponent } from './admin-plannings.component';

describe('AdminPlanningsComponent', () => {
  let component: AdminPlanningsComponent;
  let fixture: ComponentFixture<AdminPlanningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPlanningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlanningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
