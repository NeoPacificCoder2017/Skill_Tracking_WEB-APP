import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {
  environment = environment;
  reports: any;
  newReportForm: FormGroup;
  loading = false;
  submitted = false;
  reportdetail: any;

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) {
      this.reportdetail = {};
     }

  ngOnInit() {
    this.apiService.get('reports/allDate/allUser').subscribe(
      data => {
        this.reports = data;
        this.reportdetail = data[6];
        console.log('reports', this.reports);
        console.log('reportdetail', this.reportdetail);
      }
    );

  }

  showdetailReport(idReport) {
    console.log('Formation', idReport);
    this.router.navigate(['admin/reportDetail'], { queryParams: { idReport: idReport } });
  }

}
