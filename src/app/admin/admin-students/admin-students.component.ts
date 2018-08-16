import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  environment = environment;
  students: any;
  newStudentForm: FormGroup;
  newStudentImage: File;
  loading = false;
  submitted = false;
  formations: any;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {

    this.newStudentForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required],
      formation_id: ['', Validators.required],
      gender: ['', Validators.required],
    });

    this.apiService.get('getAllFormationsForAdmin').subscribe(
      data => {
        console.log('dataFormations', data);
        this.formations = data;
      }
    );

    this.apiService.get('users/student').subscribe(
      data => {
        console.log('dataStudents', data);
        this.students = data.data;
      }
    );

  }

  // convenience getter for easy access to form fields
  get s() { return this.newStudentForm.controls; }

  onFileChanged(event) {
    console.log('event', event);
    this.newStudentImage = event.target.files[0];
  }

  createStudent(): any {
    this.submitted = true;
    if (this.newStudentForm.invalid && this.newStudentImage == null) {
      return;
    }

    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('lastname', this.s.lastname.value);
    uploadData.append('firstname', this.s.firstname.value);
    uploadData.append('email', this.s.email.value);
    uploadData.append('password', this.s.password.value);
    uploadData.append('c_password', this.s.password.value);
    uploadData.append('formation_id', this.s.formation_id.value);
    console.log('formation-id', this.s.formation_id.value);
    uploadData.append('gender', this.s.gender.value);
    uploadData.append('avatar', this.newStudentImage, this.newStudentImage.name);

    console.log('uploadData', uploadData);
    console.log('this.newStudentImage', this.newStudentImage);
    this.apiService.upload('createStudent', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

  deleteStudent(idStudent): any {
    this.apiService.delete('student/' + idStudent)
    .subscribe(data => {
      this.ngOnInit();
      console.log('data', data);
    });
  }

}
