import { Subject } from 'rxjs';
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

  Formation(idFormation) {
    console.log('Formation', idFormation);
    this.router.navigate(['/admin/formation/' + idFormation]);
  }

  // createFormation(idFormation): any {
  //   this.apiService.post('formation/create')
  //   .subscribe((data) => {

  //   });
  // }

  deleteFormation(id: number): any {
    this.apiService.delete('formation/' + id)
    .subscribe((data) => {
      this.deleteFormation = data.data;
      console.log('modules data', this.deleteFormation);
    });
  }

}
