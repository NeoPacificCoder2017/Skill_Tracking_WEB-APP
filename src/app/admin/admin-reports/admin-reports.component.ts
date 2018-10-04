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

  environment = environment;
  reports: any;
  dataReport: any;
  students = [];
  allReports = [];
  displayViewReport = 0;
  selectedStudent: any;
  selectedDate: any;
  selectedFormation = 'all';
  report: any;
  formations: {};

  constructor(private apiService: ApiService, private filterPipe: FilterPipe, private router: Router) {}

  ngOnInit() {
    this.apiService.get('reportsByFormation/'+this.selectedFormation).subscribe(
      data => {
        this.dataReport = this.allReports = data;
        console.log('data Report', data);
        this.generateStudentsList();
      }
    );

    this.apiService.get('getAllFormationsForAdmin').subscribe(
      data => {
        this.formations = data;
      }
    );
  }
  
  generateStudentsList() {
    this.students = [];
    for (let i = 0; i < this.dataReport.length; i++) {
      const studentName = this.dataReport[i].studentFirstname + ' ' + this.dataReport[i].studentLastname;
      const studentId = this.dataReport[i].studentId;
      const position = this.students.map(function(e) { return e.studentName; }).indexOf(studentName);
      if (position === -1)  {
        this.students.push({
          studentName: studentName,
          studentId: studentId
        });
      }
    }
  }
  
  viewReport(item) {
    this.report = item;
    console.log('this.report', this.report);
  
    this.displayViewReport = 1;
    this.report.report_text = this.report.report_text.split('::://:::');
  }
  
  closeViewReport() {
    this.displayViewReport = 0;
  }

  filterReportsByFormation(){
    this.selectedDate = "";
    this.apiService.get('reportsByFormation/'+this.selectedFormation).subscribe(
      data => {
        this.dataReport = this.allReports = data;
        console.log('data Report', data);
        this.generateStudentsList();
      }
    );
  }
  
  filterReports() {
    console.log('filterByStudent studentId ',  this.selectedStudent);
    console.log('filterByStudent studentId ',  this.selectedDate);
    const filter = {
      studentId: this.selectedStudent,
      report_date: (this.selectedDate !== '0')?this.selectedDate:''
    }
    this.dataReport = this.filterPipe.transform(this.allReports, filter);
  }
}
