import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrganismsComponent } from './admin-organisms.component';

describe('AdminOrganismsComponent', () => {
  let component: AdminOrganismsComponent;
  let fixture: ComponentFixture<AdminOrganismsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrganismsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrganismsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
