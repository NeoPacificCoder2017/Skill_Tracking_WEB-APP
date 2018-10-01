import { environment } from './../../../environments/environment';
import { ApiService } from './../../services/api/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  environment = environment;
  max = 100;
  formation: any;
  dataStudent: any;
  allSkills = [];
  skills = [];
  skillValidated = false;
  progressions = [];
  moduleSelected = 0;
  selectedSkills: number[] = [0];
  totalSkills = 0;
  totalStudentValidation = 0;
  totalTeacherValidation = 0;
  me: any;
  formations: any;
  selectedFormation: any;

  constructor(private apiService: ApiService) {
    this.formation = {};
  }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);
    this.selectedFormation = this.me.formation_id;

    this.apiService.get('studentsFormation').subscribe(data => {
      console.log('StudentDashboardComponent studentsFormation data', data);
      this.formations = data;
    });

    this.getFormationDatas();
  }

  getFormationDatas() {

    this.totalSkills = 0;
    this.totalStudentValidation = 0;
    this.totalTeacherValidation = 0;

    this.allSkills = [];
    this.skills = [];

    this.apiService.get('formation/' + this.selectedFormation).subscribe(data => {
      console.log('StudentDashboardComponent formation data', data);
      this.formation = data;
    });

    const url = (this.selectedFormation)?'getFormationForAdmin/'+this.selectedFormation:'getFormations';
    this.apiService.get(url).subscribe(data => {
      console.log('StudentDashboardComponent getFormation data', data);
      this.dataStudent = data;
      for (let i = 0; i < this.dataStudent.length; i++) {
        for (let j = 0; j < this.dataStudent[i].module.skills.length; j++) {
          this.totalSkills++;
          this.dataStudent[i].module.skills[j]['module_id'] = this.dataStudent[i].module.id;
          this.dataStudent[i].module.skills[j]['module_name'] = this.dataStudent[i].module.name;
          if (this.dataStudent[i].module.skills[j]['progression']['student_validation']) {
            this.selectedSkills.push(this.dataStudent[i].module.skills[j]['id']);
            this.totalStudentValidation++;
          }
          if (this.dataStudent[i].module.skills[j]['progression']['teacher_validation']) {
            this.totalTeacherValidation++;
          }
          this.skills.push(this.dataStudent[i].module.skills[j]);
          this.allSkills.push(this.dataStudent[i].module.skills[j]);
        }
      }
    });
  }

  skillValidatedByStudent(skillId, progressionId, studentValidation, skillIndex) {
    studentValidation = (studentValidation === 1) ? 0 : 1;
    console.log('skillValidatedByStudent skillId', skillId);
    console.log('skillValidatedByStudent progressionId', progressionId);
    console.log('skillValidatedByStudent studentValidation', studentValidation);
    this.skills[skillIndex].progression.student_validation = studentValidation;

    this.updateSkillsArray(skillId, studentValidation);

    const datas = { progression_id: progressionId, student_validation: studentValidation };

    this.apiService.put('progression/updateStudentValidation', datas)
    .subscribe(data => {
      console.log('skillValidatedByStudent data', data);
    });
  }

  updateSkillsArray(skillId, studentValidation) {
    console.log('updateSkillsArray launched');
    console.log('updateSkillsArray skillId', skillId);
    console.log('updateSkillsArray this.allSkills[0]', this.allSkills[0]);
    for (let i = 0; i < this.allSkills.length; i++) {
      if (this.allSkills[i].id === skillId) {
        console.log('updateSkillsArray (this.allSkills[i].id === skillId OK');
        this.allSkills[i].progression.student_validation = studentValidation;
        break;
      }
    }

    this.filterByModule(this.moduleSelected);

    for (let i = 0; i < this.dataStudent.length; i++) {
      for (let j = 0; j < this.dataStudent[i].module.skills.length; j++) {
        if (this.dataStudent[i].module.skills[j].id === skillId) {
          this.dataStudent[i].module.skills[j].progression.student_validation = studentValidation;
          break;
        }
      }
    }
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
    const index = this.selectedSkills.indexOf(skillId);
    if (index === -1) {
      this.selectedSkills.push(skillId);
    } else {
      this.selectedSkills.splice(index, 1);
    }
  }

  isStudentValidated(skillId) {
    return this.selectedSkills.indexOf(skillId) >= 0;
  }

  stateText(skillId) {
    return (this.selectedSkills.indexOf(skillId) >= 0) ? 'validé' : 'à valider';
  }

  selectFormation() {
    console.log('selected', this.selectedFormation);
    this.getFormationDatas();
  }
}
