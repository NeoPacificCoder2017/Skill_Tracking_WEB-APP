import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompetencesComponent } from './admin-competences.component';

describe('AdminCompetencesComponent', () => {
  let component: AdminCompetencesComponent;
  let fixture: ComponentFixture<AdminCompetencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompetencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompetencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
