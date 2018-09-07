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
  tabSelected = 1;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
   ) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idTeacher = params.idTeacher;
        this.getFormations();
      });
  }

  goBack() {
    this.location.back();
  }

  public getFormations(): any {
    this.apiService.get('teacher/myFormations')
    .subscribe((data) => {
      this.listFormations = data.data;
      console.log('this.listFormations', this.listFormations);
    });
  }


}
