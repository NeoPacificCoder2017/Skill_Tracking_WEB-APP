import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api/api.service';
import { $ } from '../../../../node_modules/protractor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.css']
})
export class StudentReportComponent implements OnInit {

  formation: any;
  me: any;
  dataReport: any;
  dataStudent: any;
  newReportForm: FormGroup;
  submitted: false;
  loading: false;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router) {
    this.formation = {};
  }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);
    this.apiService.get('formation/' + this.me.formation_id).subscribe(data => {
      this.formation = data;
    });
    this.getReports();

  }

// recuperer la liste des rapports d une formation
  public getReports() {
    this.apiService.get('report/getStudentsReportByFormation').subscribe(data => {
      this.dataReport = data.data;
      console.log('data Report', data);
    });
  }

  // recupere la liste des etudiants d une formation
  getSelectedStudentsSearch(formation_id) {
    this.apiService.get('getStudentsOfAFormation/' + this.formation.formation_id).subscribe(
      data => {
        this.dataStudent = data.data;
        console.log('getStudentOfFormation data', data);
      }
    );
  }

// modifier un rapport
  viewReport(report_id) {
    console.log('id rapport', report_id);
    this.router.navigate(['/student/report'], {queryParams : { report_id : report_id }} );
  }

// creer un rapport
  createReport(student_id): any {
    console.log('createReport');
    this.router.navigate(['/student/report/create'], {queryParams : { student_id : student_id }} );
  }
}
