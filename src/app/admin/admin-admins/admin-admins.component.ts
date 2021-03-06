import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '../../../../node_modules/@angular/router';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-admin-admins',
  templateUrl: './admin-admins.component.html',
  styleUrls: ['./admin-admins.component.css']
})
export class AdminAdminsComponent implements OnInit {
  environment = environment;
  admins: any;
  newAdminForm: FormGroup;
  loading = false;
  submitted = false;
  newAdminImage: File;
  user_type_id: any = 1;

  constructor(private apiService: ApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newAdminForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      c_password: ['', Validators.required],
      phone_number: ['', Validators.required],
      birthday_date: ['', Validators.required],
      gender: ['', Validators.required],
    });
    this.apiService.get('users/admin').subscribe(
      data => {
        console.log('data', data);
        this.admins = data.data;
      }
    );
  }

  showToProfileAdmin(idAdmin) {
    console.log('idAdmin', idAdmin);
    this.router.navigate(['admin/profileAdmin'], { queryParams: { idAdmin: idAdmin } });
  }

  get f() { return this.newAdminForm.controls; }

  onFileChanged(event) {
    console.log(event);
    this.newAdminImage = event.target.files[0];
  }

  createAdmin(): any {
    this.submitted = true;

    if (this.newAdminForm.invalid == null) {
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
    uploadData.append('avatar', this.newAdminImage, this.newAdminImage.name);
    uploadData.append('gender', this.f.gender.value);
    uploadData.append('user_type_id', this.user_type_id);

    console.log('uploadData', uploadData);
    console.log('this.newAdminImage', this.newAdminImage);
    this.apiService.upload('register', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

  deleteAdmin(idUser): any {
    this.apiService.delete('user/' + idUser)
    .subscribe(data => {
      this.ngOnInit();
      console.log('user:', data);
    });
  }

}
