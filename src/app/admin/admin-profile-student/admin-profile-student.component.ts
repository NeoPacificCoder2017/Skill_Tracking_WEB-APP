import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-profile-student',
  templateUrl: './admin-profile-student.component.html',
  styleUrls: ['./admin-profile-student.component.css']
})
export class AdminProfileStudentComponent implements OnInit {

  idStudent: any;
  profileStudent: any;
  environment = environment;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
      this.profileStudent = {};
     }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idStudent = params.idStudent;
        this.getProfileStudent();
      });
  }

  goBack() {
    this.location.back();
  }

  getProfileStudent(): any {
    this.apiService.get('studentProfil/' + this.idStudent)
      .subscribe((data) => {
        console.log('idStudent', this.idStudent);
        this.profileStudent = data;
        console.log('getProfileStudent', this.profileStudent);
      });
  }

}
