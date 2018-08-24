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

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.apiService.get('reports').subscribe(
      data => {
        this.reports = data;
        console.log('reports', data);
      }
    );
  }

}
