import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  environment = environment;
  users: any;
  newUserForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.newUserForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      profile_type_id: ['', Validators.required]
  });
    this.apiService.get('users').subscribe(
      data => {
        console.log('data', data);
        this.users = data.data;
      }
    );
  }

  get f() { return this.newUserForm.controls; }

  createUser(): any {
    this.submitted = true;
    this.loading = true;
    const start_at = this.f.start_at.value.split('/');
    const end_at = this.f.end_at.value.split('/');
    const uploadData = new FormData();
    uploadData.append('firstname', this.f.firstname.value);
    uploadData.append('lastname', this.f.lastname.value);
    uploadData.append('email', this.f.email.value);
    uploadData.append('profile_type_id', this.f.profile_type_id.value);

    console.log('uploadData', uploadData);
    this.apiService.upload('user/create', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

  deleteUser(idUser): any {
    this.apiService.delete('user/' + idUser)
    .subscribe(data => {
      this.ngOnInit();
    });
  }
}
