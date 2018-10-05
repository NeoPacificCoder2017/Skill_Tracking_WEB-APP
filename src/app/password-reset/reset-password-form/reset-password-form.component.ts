import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {
  
  currentUrl: any;
  resetForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private location: Location,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
    ) {
    this.currentUrl = this.location.path();
    var currentUrlString = this.currentUrl.substring(21);
    console.log('la gin', currentUrlString);
   }


   ngOnInit() {
     
    this.currentUrl = this.location.path().substring(21);
    console.log('thisdjo', this.currentUrl)
    this.resetForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    });
  }
  get f() { return this.resetForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetForm.invalid) {
        return;
    }

    console.log('this.currentURL Teraitea', this.currentUrl);
    this.loading = true;
    console.log('email', this.f.username.value);
    console.log('password_confirmation', this.f.password_confirmation.value);
    console.log('password', this.f.password.value);
    console.log('this.currentUrl on submit', this.currentUrl);

    this.authService.resetPasswordForm(this.f.username.value, this.f.password_confirmation.value, this.f.password_confirmation.value, this.currentUrl )
    .subscribe(
        data => {
          this.loading = true;
          console.log('réinitialisation OK', data);
        },
        error => {
            this.loading = false;
            console.log('error forgot password', error);
        });
  }

}
