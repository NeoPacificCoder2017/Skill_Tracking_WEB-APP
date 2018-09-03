import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileAdminComponent } from './admin-profile-admin.component';

describe('AdminProfileAdminComponent', () => {
  let component: AdminProfileAdminComponent;
  let fixture: ComponentFixture<AdminProfileAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProfileAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
