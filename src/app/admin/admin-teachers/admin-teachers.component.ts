import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent implements OnInit {

  environment = environment;
  teachers: any;
  newTeacherForm: FormGroup;
  loading = false;
  submitted = false;
  newTeacherImage: File;
  usertypes: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.newTeacherForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      c_password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      user_type_id: ['', Validators.required]
    });
    this.apiService.get('users/teacher').subscribe(
      data => {
        this.teachers = data.data;
        console.log('teachers', data);
      }
    );
  }

  get f() { return this.newTeacherForm.controls; }

  onFileChanged(event) {
    console.log(event);
    this.newTeacherImage = event.target.files[0];
  }

  createTeacher(): any {
    this.submitted = true;

    if (this.newTeacherForm.invalid == null && this.newTeacherImage == null) {
      return;
    }
    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('firstname', this.f.firstname.value);
    uploadData.append('lastname', this.f.lastname.value);
    uploadData.append('email', this.f.email.value);
    uploadData.append('password', this.f.password.value);
    uploadData.append('c_password', this.f.c_password.value);
    uploadData.append('avatar', this.newTeacherImage, this.newTeacherImage.name);
    uploadData.append('gender', this.f.gender.value);
    uploadData.append('user_type_id', this.f.user_type_id.value);

    console.log('uploadData', uploadData);
    console.log('this.newTeacherImage', this.newTeacherImage);
    this.apiService.upload('register', uploadData)
    .subscribe(
      data => {
      console.log('createTeacher data', data);
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
      },
      error => {
        console.log('error ', error);
      }
    );
  }

  deleteTeacher(idUser): any {
    this.apiService.delete('user' + idUser)
    .subscribe(data => {
      this.ngOnInit();
      console.log('user :', idUser);
    });
  }


}
