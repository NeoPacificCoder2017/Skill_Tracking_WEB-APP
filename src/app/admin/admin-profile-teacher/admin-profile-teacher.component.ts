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
  editeTeacherForm: FormGroup;
  newTeacherImage: File;
  loading = false;
  submitted = false;
  user_type_id: any = 2;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
   ) {
    this.teacherProfile = {};
   }

  ngOnInit() {
    this.editeTeacherForm = this.formBuilder.group({
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
      this.listFormations = data[0].formations;
      console.log('getprofileTeacher', this.teacherProfile);
    });
  }

  get f() { return this.editeTeacherForm.controls; }

  onFileChanged(event) {
    console.log(event);
    this.newTeacherImage = event.target.files[0];
  }

  editeTeacher(): any {
    this.submitted = true;

    if (this.editeTeacherForm.invalid == null) {
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
    uploadData.append('avatar', this.newTeacherImage, this.newTeacherImage.name);
    uploadData.append('gender', this.f.gender.value);
    uploadData.append('user_type_id', this.user_type_id);

    console.log('uploadData', uploadData);
    console.log('this.newTeacherImage', this.newTeacherImage);
    this.apiService.upload('user/update/' + this.idTeacher, uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }


}
