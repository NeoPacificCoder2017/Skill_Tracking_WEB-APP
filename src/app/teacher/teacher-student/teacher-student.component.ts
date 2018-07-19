import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';

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
  modules: any;
  idFormation: number;
  idStudent: number;
  studentDetail: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idFormation = params.idFormation;
        this.idStudent = params.idStudent;
        this.getStudentOfFormation();
      });
  }



  filterByModule(moduleId) {
    console.log('filterByModule moduleId', moduleId);
    this.skills = [];
    for (let i = 0; i < this.allSkills.length; i++) {
      if (this.allSkills[i].module_id === moduleId) { this.skills.push(this.allSkills[i]); }
    }
  }

  public getStudentOfFormation(): any {
    this.apiService.get('getStudentDatas/' + this.idStudent + '/ofFormation/' + this.idFormation)
      .subscribe((data) => {
        console.log('getStudentOfFormation data', data);
        this.studentDetail = data.student;
        this.modules = data.modules;
        console.log('studentDetail', this.studentDetail);
        for (let i = 0; i < this.modules.length; i++) {
          for (let j = 0; j < this.modules[i].skills.length; j++) {
            this.modules[i].skills[j]['module_id'] = this.modules[i].id;
            this.modules[i].skills[j]['module_name'] = this.modules[i].name;
            this.skills.push(this.modules[i].skills[j]);
            this.allSkills.push(this.modules[i].skills[j]);
          }
        }
      });
  }

  // startSlide() {
  //   $('.carousel').carousel({
  //     interval: 2000,
  //   });
  // }

}

