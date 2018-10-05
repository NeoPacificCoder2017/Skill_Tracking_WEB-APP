import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  redirect = [null, 'admin', 'teacher', 'student'];

  constructor(
    private authService: AuthService,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit() {

    const me = this.authService.me();
    if (me) { this.router.navigate([this.redirect[me.user_type_id] + '/dashboard']); }

    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    // reset login status
    // this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
    document.getElementById("loadingWrapper2").style.display = 'none';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    console.log('this.f.username', this.f.username.value);
    console.log('this.f.password', this.f.password.value);
    this.authService.login(this.f.username.value, this.f.password.value)
    .subscribe(
        data => {
          this.loading = false;
          console.log('login data', data);
          this.router.navigate([this.redirect[data.user_type_id] + '/dashboard']);
        },
        error => {
            this.loading = false;
            console.log('login error', error);
        });
  }
}
