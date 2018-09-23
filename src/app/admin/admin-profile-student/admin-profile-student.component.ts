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

  tabSelected = 1;
  idStudent: any;
  profileStudent: any;
  formationStudent: any;
  skillsStudent: any;
  reportStudent: any;
  editeStudentForm: FormGroup;
  environment = environment;
  newStudentImage: File;
  loading = false;
  submitted = false;
  user_type_id: any = 3;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
      this.profileStudent = {};
     }

  ngOnInit() {
    this.editeStudentForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required],
      phone_number: ['', Validators.required],
      birthday_date: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.route.queryParams
      .subscribe(params => {
        this.idStudent = params.idStudent;
        this.getProfileStudent();
        this.getReportStudent();
        this.getSkillStudentValidated();
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

  getReportStudent(): any {
    this.apiService.get('reportForAdminByStudentId/' + this.idStudent)
      .subscribe((data) => {
        console.log('idStudent', this.idStudent);
        this.reportStudent = data;
        console.log('getReportStudent', this.reportStudent);
      });
  }

  getSkillStudentValidated(): any {
    this.apiService.get('getProgressionForAdminByStudentId/' + this.idStudent)
      .subscribe((data) => {
        console.log('idStudent', this.idStudent);
        this.skillsStudent = data;
        console.log('getSkillStudentValidated', this.skillsStudent);
      });
  }

  get f() { return this.editeStudentForm.controls; }

  onFileChanged(event) {
    console.log(event);
    this.newStudentImage = event.target.files[0];
  }

  editeStudent(): any {
    this.submitted = true;

    if (this.editeStudentForm.invalid == null) {
      return;
    }
    this.loading = true;
    const birthday_date = this.f.birthday_date.value.split('/');
    const uploadData = new FormData();
    uploadData.append('firstname', this.f.firstname.value);
    uploadData.append('lastname', this.f.lastname.value);
    uploadData.append('email', this.f.email.value);
    uploadData.append('password', this.f.password.value);
    uploadData.append('c_password', this.f.c_password.value);
    uploadData.append('phone_number', this.f.phone_number.value);
    uploadData.append('birthday_date', birthday_date[2] + '-' + birthday_date[1] + '-' + birthday_date[0] + ' 00:00:00:00');
    uploadData.append('avatar', this.newStudentImage, this.newStudentImage.name);
    uploadData.append('gender', this.f.gender.value);
    uploadData.append('user_type_id', this.user_type_id);

    console.log('uploadData', uploadData);
    console.log('this.newStudentImage', this.newStudentImage);
    this.apiService.upload('user/update/' + this.idStudent, uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

}
