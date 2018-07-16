import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  redirect = [null, 'admin', 'teacher', 'student'];
  listFormations: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('formations').subscribe(
      data => {
        console.log('data', data);
        this.listFormations = data.data;
      }
    );
  }



}
