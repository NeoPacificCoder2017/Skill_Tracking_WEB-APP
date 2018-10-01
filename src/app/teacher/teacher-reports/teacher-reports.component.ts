import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-teacher-reports',
  templateUrl: './teacher-reports.component.html',
  styleUrls: ['./teacher-reports.component.css']
})
export class TeacherReportsComponent implements OnInit {

  formation: any;
  me: any;
  dataReport: any;
  dataStudent: any;
  students = [];
  report: any;
  displayViewReport = 0;
  selectedStudent: any;
  selectedFormation: any;
  formations: any;

  constructor(
    private apiService: ApiService,
    private filter: FilterPipe,
  ) {
      this.formation = {};
      this.report = {title : '', rate : '', text : ''};
    }

    ngOnInit() {
      this.me = JSON.parse(localStorage.getItem('user'));
      console.log('this.me', this.me);
      this.apiService.get('formation/' + this.me.formation_id).subscribe(data => {
        this.formation = data;
        console.log('formation_id data', this.formation);
      });
      this.getReports();
      this.getFormations();

    }

    getFormations(): any {
      this.apiService.get('teacher/myFormations')
      .subscribe((data) => {
        this.formations = data.data;
        console.log('formations data', this.formations);
      });
    }

    // recuperer la liste des rapports des toutes formations confondues
    public getReports() {
      this.apiService.get('report/reportsAvailableForTeacher').subscribe(data => {
        this.dataReport = data;
        console.log('data Report', this.dataReport);
        this.generateStudentsList();
      });
    }

    // recupere la liste des etudiants d une formation
    getSelectedStudentsSearch(formation_id) {
      this.apiService.get('getStudentsOfAFormation/' + this.me.formation_id).subscribe(
        data => {
          this.dataStudent = data.data;
          console.log('getStudentOfFormation data', data);
        }
      );
    }

    generateStudentsList() {
      console.log('generateStudentsList this.dataReport', this.dataReport);
      for (let i = 0; i < this.dataReport.length; i++) {
        const studentName = this.dataReport[i].student.firstname + ' ' + this.dataReport[i].student.lastname;
        console.log('studentName: ', studentName);
        if (this.students.indexOf(studentName) === -1)  {
          this.students.push(studentName);
        }
      }
      console.log('generateStudentsList this.students', this.students);
    }


    // modifier un rapport
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