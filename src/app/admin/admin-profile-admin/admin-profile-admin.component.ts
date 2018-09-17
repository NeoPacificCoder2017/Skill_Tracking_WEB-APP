import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-profile-admin',
  templateUrl: './admin-profile-admin.component.html',
  styleUrls: ['./admin-profile-admin.component.css']
})
export class AdminProfileAdminComponent implements OnInit {

  idAdmin: any;
  profileAdmin: any;
  editeAdminForm: FormGroup;
  newAdminImage: File;
  loading = false;
  submitted = false;
  user_type_id: any = 1;
  environment = environment;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
      this.profileAdmin = {};
     }

  ngOnInit() {
    this.editeAdminForm = this.formBuilder.group({
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
        this.idAdmin = params.idAdmin;
        this.getProfileAdmin();
      });
  }

  goBack() {
    this.location.back();
  }

  getProfileAdmin(): any {
    this.apiService.get('adminProfil/' + this.idAdmin)
      .subscribe((data) => {
        console.log('idAdmin', this.idAdmin);
        this.profileAdmin = data;
        console.log('getProfileAdmin', this.profileAdmin);
      });
  }

  get f() { return this.editeAdminForm.controls; }

  onFileChanged(event) {
    console.log(event);
    this.newAdminImage = event.target.files[0];
  }

  editeAdmin(): any {
    this.submitted = true;

    if (this.editeAdminForm.invalid == null) {
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
    this.apiService.upload('user/update/' + this.idAdmin, uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

}
