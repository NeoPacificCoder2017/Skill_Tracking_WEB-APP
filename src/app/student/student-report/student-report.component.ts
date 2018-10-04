import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api/api.service';
// import { $ } from '../../../../node_modules/protractor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { environment } from '../../../environments/environment';
import { FilterPipe } from 'ngx-filter-pipe';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.css']
})
export class StudentReportComponent implements OnInit {
  
  environment = environment;
  newReportForm: FormGroup;
  formation: any;
  me: any;
  dataDetailReport: any;
  dataReport: any;
  dataStudent: any;
  report: any;
  selectedStudent: any;
  selectedDate: any;
  submitted: false;
  loading: false;
  students = [];
  allReports = [];
  displayViewReport = 0;
  displayEditReport = 0;
  
  constructor(private location: Location, private apiService: ApiService, private formBuilder: FormBuilder, private router: Router, private filterPipe: FilterPipe, private froalaEditorModule: FroalaEditorModule, private froalaViewModule: FroalaViewModule) {
    this.formation = {};
    this.report = {title : '', rate : '', text : ''};
  }
  
  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);
    this.apiService.get('formation/' + this.me.formation_id).subscribe(data => {
      this.formation = data;
      console.log('formation_id data', data.id);
    });
    this.getReports();
    
  }
  
  goBack() {
    this.location.back();
  }
  
  // recuperer la liste des rapports d une formation
  public getReports() {
    this.apiService.get('report/getStudentsReportByFormation').subscribe(data => {
      this.dataReport = this.allReports = data.data;
      console.log('data Report', data);
      this.generateStudentsList();
    });
  }
  
  generateStudentsList() {
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
  
  
  // modifier un rapport
  viewReport(item) {
    this.displayViewReport = 1;
    console.log('displayViewReport', this.displayViewReport);
    this.report = item;
    this.displayEditReport = (this.me.user_id === this.report.student_id) ? 1 : 0;
  }
  
  closeViewReport() {
    this.displayViewReport = 0;
  }
  
  // creer un rapport
  createReport(student_id): any {
    this.router.navigate(['/student/report/create'], {queryParams : { student_id : student_id }} );
  }
  
  updateReport(student_id) {
    console.log('report id', this.report.report_id);
  }
  
  stateText() {
    return ( this.report.is_daily === 0) ? 'Hebdomadaire' : 'Journalier';
  }
  
  saveReport() {
    return null;
  }
  
  filterReportsByStudent() {
    console.log('filterByStudent studentId ',  this.selectedStudent);
      this.dataReport = (this.selectedStudent !== '0')?this.filterPipe.transform(this.allReports, { studentId: this.selectedStudent}):this.allReports;
  }
  
  filterReportsByDate() {
    console.log('filterByStudent studentId ',  this.selectedDate);
      this.dataReport = (this.selectedDate !== '0')?this.filterPipe.transform(this.allReports, { report_date: this.selectedDate}):this.allReports;
  }
}
