import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherModuleComponent } from './teacher-module.component';

describe('TeacherModuleComponent', () => {
  let component: TeacherModuleComponent;
  let fixture: ComponentFixture<TeacherModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
