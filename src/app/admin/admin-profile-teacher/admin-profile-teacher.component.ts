import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-profile-teacher',
  templateUrl: './admin-profile-teacher.component.html',
  styleUrls: ['./admin-profile-teacher.component.css']
})
export class AdminProfileTeacherComponent implements OnInit {

  listFormations: any;
  environment = environment;
  dataTeacher: any;
  idTeacher: any;
  teacherProfile: any;
  tabSelected = 1;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
   ) { 
    this.teacherProfile = {};
   }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idTeacher = params.idTeacher;
        this.getprofileTeacher();
      });
  }

  goBack() {
    this.location.back();
  }

  public getprofileTeacher(): any {
    this.apiService.get('teacherProfil/' + this.idTeacher)
    .subscribe((data) => {
      this.teacherProfile = data[0];
      console.log('getprofileTeacher', this.teacherProfile);
    });
  }


}
