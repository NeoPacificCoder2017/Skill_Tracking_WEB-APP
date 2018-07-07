import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {

  redirect = [null, 'admin', 'teacher', 'student'];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    console.log('logout launched');
    this.authService.logout().subscribe((data) => {
      console.log('logout test', data);
      this.router.navigate(['/login']);
    });
  }

}
