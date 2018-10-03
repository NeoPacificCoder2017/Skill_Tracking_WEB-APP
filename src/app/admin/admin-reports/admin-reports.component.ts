import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  selectedStudent: any = { name: '' };

  environment = environment;
  reports: any;
  newReportForm: FormGroup;
  loading = false;
  submitted = false;
  students: any;

  constructor(private apiService: ApiService,
    private filterPipe: FilterPipe,
    private router: Router) {}

  ngOnInit() {
    this.apiService.get('reports/allDate/allUser').subscribe(
      data => {
        this.reports = data;
        console.log('reports', this.reports);
      }
    );

    this.apiService.get('users/student').subscribe(
      data => {
        this.students = data.data;
        console.log('students', this.students);
      }
    );

  }

  showdetailReport(idReport) {
    console.log('Formation', idReport);
    this.router.navigate(['admin/reportDetail'], { queryParams: { idReport: idReport } });
  }



}
