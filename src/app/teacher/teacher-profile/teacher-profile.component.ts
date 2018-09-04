import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api/api.service';


@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  environment = environment;
  dataTeacher: any;
  public me: any;
  tabSelected = 1;
  listFormations: any;


  constructor(private location: Location,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);
    this.getFormations();
  }

  goBack() {
    this.location.back();
  }

  public getFormations(): any {
    this.apiService.get('teacher/myFormations')
    .subscribe((data) => {
      this.listFormations = data.data;
      console.log('formations data', this.listFormations);
    });
  }

}
