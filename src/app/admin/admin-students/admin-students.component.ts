import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  environment = environment;
  students: any;
  newStudentForm: FormGroup;
  loading = false;
  submitted = false;
  newStudentImage: File;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newStudentForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required],
      gender: ['', Validators.required],
      user_type_id: ['', Validators.required]
    });

    this.apiService.get('users/student').subscribe(
      data => {
        console.log('data', data);
        this.students = data.data;
      }
    );
  }

  get f() { return this.newStudentForm.controls; }

  onFileChanged(event) {
    console.log(event);
    this.newStudentImage = event.target.files[0];
  }

  createStudent(): any {
    this.submitted = true;

    if (this.newStudentForm.invalid == null) {
      return;
    }
    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('firstname', this.f.firstname.value);
    uploadData.append('lastname', this.f.lastname.value);
    uploadData.append('email', this.f.email.value);
    uploadData.append('password', this.f.password.value);
    uploadData.append('c_password', this.f.c_password.value);
    uploadData.append('avatar', this.newStudentImage, this.newStudentImage.name);
    uploadData.append('gender', this.f.gender.value);
    uploadData.append('user_type_id', this.f.user_type_id.value);

    console.log('uploadData', uploadData);
    console.log('this.newStudentImage', this.newStudentImage);
    this.apiService.upload('register', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

  deleteStudent(idStudent): any {
    console.log('user :', idStudent);
    this.apiService.delete('user/' + idStudent)
    .subscribe(data => {
      this.ngOnInit();
    });
  }

}
