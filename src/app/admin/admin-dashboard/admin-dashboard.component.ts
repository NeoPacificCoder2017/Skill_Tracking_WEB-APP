import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  listFormations: any;

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.apiService.get('formations').subscribe(
      data => {
        console.log('data', data);
        this.listFormations = data.data;
      }
    );
  }

  goToFormation(idFormation) {
    console.log('goToModule', idFormation);
    this.router.navigate(['/admin/formation/' + idFormation]);
  }



}
