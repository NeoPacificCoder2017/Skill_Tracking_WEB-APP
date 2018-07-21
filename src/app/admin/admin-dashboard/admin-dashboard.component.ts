import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  redirect = [null, 'admin', 'teacher', 'student'];
  listFormations: any;
  name: string;
  start_at: any = '08/20/2018';
  end_at: any = '20/07/2018';
  logoFile: File = null;
  formations: any;
  environment = environment;
  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) {

  }
  ngOnInit() {
    this.apiService.get('formations').subscribe(
      data => {
        console.log('data', data);
        this.listFormations = data.data;
      }
    );
  }

  logo(event) {
    console.log(event);
  }

  Formation(idFormation) {
    console.log('Formation', idFormation);
    this.router.navigate(['/admin/formation/'], { queryParams: { idFormation } });
  }


  createFormation(): any {
    this.apiService.post('formation/create', this.formations)
    .subscribe((data: any) => {
      console.log('formation create', data);
    });
  }

  deleteFormation(idFormation): any {
    this.apiService.delete('formation/' + idFormation)
    .subscribe((data) => {
      this.deleteFormation = data.data;
      console.log('modules data', this.deleteFormation);
    });
  }

}
