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
  dataDetailReport: any;
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

// // modifier un rapport
//   viewReport(report_id, report_rate, report_title, student_id, text, created_date, last_edit_date, is_daily) {
//     console.log('id rapport', report_id);
//     console.log('note rapport', report_rate);
//     console.log('titre rapport', report_title);
//     console.log('student_id rapport', student_id);
//     console.log('contenu rapport', text);
//     console.log('date de création du rapport', created_date);
//     console.log('date de dernière modification du rapport', last_edit_date);
//     console.log('rapport journalier', is_daily);
//     this.dataDetailReport.report_id = report_id;
//     this.dataDetailReport.report_title = report_title;
//     this.dataDetailReport.report_rate = report_rate;
//     this.dataDetailReport.student_id = student_id;
//     this.dataDetailReport.text = text;
//     this.dataDetailReport.created_date = created_date;
//     this.dataDetailReport.last_edit_date = last_edit_date;
//     this.dataDetailReport.is_daily = is_daily;

//     return this.dataDetailReport[];
//     // this.router.navigate(['/student/report'], {queryParams : { report_id : report_id }} );
//   }

// creer un rapport
  createReport(student_id): any {
    console.log('createReport');
    this.router.navigate(['/student/report/create'], {queryParams : { student_id : student_id }} );
  }

  updateReport() {
    console.log('modifé rapport');
    return null;
  }
}
