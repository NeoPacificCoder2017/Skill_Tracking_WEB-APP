import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-report-detail',
  templateUrl: './admin-report-detail.component.html',
  styleUrls: ['./admin-report-detail.component.css']
})
export class AdminReportDetailComponent implements OnInit {

  idReport: any;
  environment = environment;
  commenteRport: any;
  report: any;
  dateSplite: any;

  constructor(private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private ngZone: NgZone) {
      this.report = {};
   }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idReport = params.idReport;
        this.getCommentReport();
        this.getReport();
      });

  }

  goBack() {
    this.location.back();
  }


  public getCommentReport(): any {
    this.apiService.get('commentsByReport/' + this.idReport)
    .subscribe((data) => {
      this.commenteRport = data.data;
      console.log('Commentaire', this.commenteRport);
    });
  }

  public getReport(): any {
    this.apiService.get('report/' + this.idReport)
    .subscribe((data) => {
      this.report = data;
      this.dateSplite = data.date;
      console.log('report', this.report);
      console.log('date', this.dateSplite);
    });
  }

}
