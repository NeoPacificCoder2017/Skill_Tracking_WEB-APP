import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  me: any;
  environment = environment;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.me = this.authService.me();
    console.log('AppLayoutComponent ngOnInit this.me', this.me);
    if (!this.me) { this.router.navigate(['/login']); }
  }

  logout() {
    console.log('logout launched');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  redirectProfile() {
    this.router.navigate(['/admin/profile']);
  }

}
