import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-teacher-student',
  templateUrl: './teacher-student.component.html',
  styleUrls: ['./teacher-student.component.css']
})
export class TeacherStudentComponent implements OnInit {

  max = 100;
  dataStudent: any;
  allSkills = [];
  skills = [];

  constructor(private apiService: ApiService ) { }

  ngOnInit() {
    this.apiService.get('getformations').subscribe(
      data => {
        console.log('StudentDashboardComponent getFormation data', data);
        this.dataStudent = data;
        for (let i = 0; i < this.dataStudent.length; i++) {
          for (let j = 0; j < this.dataStudent[i].module.skills.length; j++) {
            this.dataStudent[i].module.skills[j]['module_id'] = this.dataStudent[i].module.id;
            this.dataStudent[i].module.skills[j]['module_name'] = this.dataStudent[i].module.name;
            this.skills.push(this.dataStudent[i].module.skills[j]);
            this.allSkills.push(this.dataStudent[i].module.skills[j]);
          }
        }
      }
    );
  }

  filterByModule(moduleId) {
    console.log('filterByModule moduleId', moduleId);
    this.skills = [];
    for (let i = 0; i < this.allSkills.length; i++) {
      if (this.allSkills[i].module_id === moduleId) { this.skills.push(this.allSkills[i]); }
    }
  }

  // startSlide() {
  //   $('.carousel').carousel({
  //     interval: 2000,
  //   });
  // }

}
