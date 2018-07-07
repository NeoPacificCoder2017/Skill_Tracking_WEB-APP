import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent implements OnInit {

  isLogged = false;
  constructor(private authService: AuthService, private router: Router) {
    // localStorage.removeItem('user');
  }

  ngOnInit() {
    this.isLogged = this.authService.isLogged();
    if (!this.isLogged) { this.router.navigate(['/login']); }
  }

  logout() {
    console.log('logout launched');
    this.authService.logout().subscribe((data) => {
      console.log('logout test', data);
      this.router.navigate(['/login']);
    });
  }

}
