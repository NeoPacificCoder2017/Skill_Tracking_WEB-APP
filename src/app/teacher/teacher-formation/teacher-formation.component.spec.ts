import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFormationComponent } from './teacher-formation.component';

describe('TeacherFormationComponent', () => {
  let component: TeacherFormationComponent;
  let fixture: ComponentFixture<TeacherFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
