import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api/api.service';
import { $ } from '../../../../node_modules/protractor';
@Component({
  selector: 'app-student-report',
  templateUrl: './student-report.component.html',
  styleUrls: ['./student-report.component.css']
})
export class StudentReportComponent implements OnInit {
  formation: any;
  me: any;
  dataReport: any;
  idReport: number;

  constructor(private apiService: ApiService) {
    this.formation = {};
  }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);
    this.apiService.get('formation/' + this.me.formation_id).subscribe(data => {
      this.formation = data;
    });
    this.getReports();
    // this.getSelectedStudentsSearch();
  }

  public getReports() {
    this.apiService.get('report/getStudentsReportByFormation').subscribe(data => {
      this.dataReport = data.data;
      console.log('dataRport', data);
    });
  }

  // getSelectedStudentsSearch(formation_id) {
  //   this.apiService.get('getStudentsOfAFormation/' + this.formation_id).subscribe(data => {
  //     console.log('getStudentOfFormation data', data);
  //   });
  // }

}
