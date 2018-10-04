import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher-report-detail',
  templateUrl: './teacher-report-detail.component.html',
  styleUrls: ['./teacher-report-detail.component.css']
})
export class TeacherReportDetailComponent implements OnInit {

  idReport: any;
  environment = environment;
  report: any;
  dateSplite: any;
  comments: any;
  displayViewReport = 0;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private ngZone: NgZone
  ) {
      this.report = {};
   }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  getComments() {
    this.apiService.get('getReport/reportId/ofFormation/formationId')
    .subscribe(data => {
      this.comments = data;
      console.log('getComents', this.comments);
    });
  }

  viewReport(item) {
    this.displayViewReport = 1;
    console.log('displayViewReport', this.displayViewReport);
    this.report = item;
  }

  closeViewReport() {
    this.displayViewReport = 0;
  }

  stateText() {
    return ( this.report.is_daily === 0) ? 'Hebdomadaire' : 'Journalier';
  }
}
