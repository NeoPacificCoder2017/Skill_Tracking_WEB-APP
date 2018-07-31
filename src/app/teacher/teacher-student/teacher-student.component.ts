import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.component.html',
  styleUrls: ['./teacher-student.component.css']
})
export class TeacherStudentComponent implements OnInit {

  environment = environment;
  max = 100;
  dataStudent: any;
  allSkills = [];
  skills = [];
  modules: any;
  idFormation: number;
  idStudent: number;
  student: any;
  moduleSelected = 0;
  selectedSkills: number[] = [0];
  totalSkills = 0;
  totalStudentValidation = 0;
  totalTeacherValidation = 0;
  formation: any;
  me: any;

  constructor(private location: Location, private route: ActivatedRoute, private apiService: ApiService) {
    this.student = {};
    this.formation = {};
  }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me',this.me);
    this.route.queryParams
      .subscribe(params => {
        this.idFormation = params.idFormation;
        this.idStudent = params.idStudent;
        this.apiService.get('formation/'+this.idFormation).subscribe(data => {
          this.formation = data;
        });
        this.getStudentOfFormation();
      });
  }

  goBack() {
    this.location.back();
  }

  public getStudentOfFormation(): any {
    const url = 'getStudentDatas/' + this.idStudent + '/ofFormation/' + this.idFormation;
    console.log('getStudentOfFormation url', url);
    this.apiService.get(url)
      .subscribe((data) => {
        console.log('getStudentOfFormation data', data);
        this.student = data.student;
        this.modules = data.modules;
        console.log('student', this.student);
        console.log('modules', this.modules);
        for (let i = 0; i < this.modules.length; i++) {
          for (let j = 0; j < this.modules[i].skills.length; j++) {
            this.totalSkills++;
            this.modules[i].skills[j]['module_id'] = this.modules[i].id;
            this.modules[i].skills[j]['module_name'] = this.modules[i].name;
            if(this.modules[i].skills[j]['progression']['student_validation']){
              this.totalStudentValidation++;
            }
            if(this.modules[i].skills[j]['progression']['teacher_validation']){
              this.selectedSkills.push(this.modules[i].skills[j]['id']);
              this.totalTeacherValidation++;
            }
            this.skills.push(this.modules[i].skills[j]);
            this.allSkills.push(this.modules[i].skills[j]);
          }
        }
        console.log('this.skills', this.skills);
        console.log('this.totalStudentValidation', this.totalStudentValidation);
        console.log('this.totalTeacherValidation', this.totalTeacherValidation);
        console.log('this.totalTeacherValidation', this.totalTeacherValidation);
      });
  }

  skillValidatedByTeacher(skillId, progressionId, teacherValidation, skillIndex) {
    teacherValidation = (teacherValidation === 1) ? 0 : 1;
    console.log('skillValidatedByTeacher skillId', skillId);
    console.log('skillValidatedByTeacher progressionId', progressionId);
    console.log('skillValidatedByTeacher teacherValidation', teacherValidation);
    this.skills[skillIndex].progression.student_validation = teacherValidation;
    console.log('skillValidatedByTeacher this.skills[skillIndex].progression.student_validation', this.skills[skillIndex].progression.student_validation);

    this.updateSkillsArray(skillId, teacherValidation);

    const datas = { progression_id: progressionId, teacher_validation: teacherValidation };

    this.apiService.put('progression/updateTeacherValidation', datas)
    .subscribe(data => {
      console.log('skillValidatedByTeacher data', data);
    });
  }

  updateSkillsArray(skillId, teacherValidation) {
    console.log('updateSkillsArray launched');
    console.log('updateSkillsArray skillId', skillId);
    console.log('updateSkillsArray this.allSkills[0]', this.allSkills[0]);
    for (let i = 0; i < this.allSkills.length; i++) {
      if (this.allSkills[i].id === skillId) {
        console.log('updateSkillsArray (this.allSkills[i].id === skillId OK');
        this.allSkills[i].progression.student_validation = teacherValidation;
        break;
      }
    }

    this.filterByModule(this.moduleSelected);
  }

  filterByModule(moduleId) {
    console.log('filterByModule moduleId', moduleId);
    console.log('filterByModule this.allSkills', this.allSkills);
    this.skills = [];
    this.moduleSelected = moduleId;
    if (this.moduleSelected === 0) {
      this.skills = this.allSkills;
    console.log('filterByModule this.skills', this.skills[0].progression);

    } else {
      console.log('filterByModule moduleId', moduleId);
      for (let i = 0; i < this.allSkills.length; i++) {
        if (this.allSkills[i].module_id === this.moduleSelected) {
          this.skills.push(this.allSkills[i]);
        }
      }
    }
  }

  onChange(skillId) {
    console.log('onChange');
    let index = this.selectedSkills.indexOf(skillId);
    if (index == -1) {
      this.selectedSkills.push(skillId);
    } else {
      this.selectedSkills.splice(index, 1);
    }
  }

  isTeacherValidated(skillId){
    return this.selectedSkills.indexOf(skillId) >= 0;
  }

  stateText(skillId){
    return (this.selectedSkills.indexOf(skillId) >= 0)?"validé":"à valider";
  }
}

