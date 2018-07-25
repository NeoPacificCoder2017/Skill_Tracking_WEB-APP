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
  formations: {};
  formation: any;
  environment = environment;

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) {
    // this.formations = {};
  }
  
  ngOnInit() {
    this.apiService.get('getAllFormationsForAdmin').subscribe(
      data => {
        console.log('data', data);
        this.formations = data;
      }
    );
  }

  logo(event) {
    console.log(event);
  }

  showFormation(idFormation) {
    console.log('Formation', idFormation);
    this.router.navigate(['/admin/formation'], { queryParams: { idFormation: idFormation } });
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
