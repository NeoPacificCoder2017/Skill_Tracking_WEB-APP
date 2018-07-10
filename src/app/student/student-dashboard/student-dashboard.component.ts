import { ApiService } from './../../services/api/api.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

  max = 100;
  dataStudent: any;
  allSkills = [];
  skills = [];

  constructor(private apiService: ApiService ) { }

  ngOnInit() {
    this.apiService.get('getFormations').subscribe(
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

}
