import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterPipe } from 'ngx-filter-pipe';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher-reports',
  templateUrl: './teacher-reports.component.html',
  styleUrls: ['./teacher-reports.component.css']
})
export class TeacherReportsComponent implements OnInit {

  environment = environment;

  dateSplite: any;
  selectedDate: any;

  formations: any;
  formation: any;
  selectedFormation: any;
  idFormation: any;

  me: any;

  dataReport: any;
  allReports = [];
  report: any;
  idReport: number;
  displayViewReport = 0;

  dataStudent: any;
  students = [];
  selectedStudent: any;

  comments: any;

  constructor(
    private apiService: ApiService,
    private filterPipe: FilterPipe,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
  ) {
      this.formation = {};
      this.report = {title : '', rate : '', text : ''};
      this.comments = {};
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

  // Récupérer toutes les formations assignées au formateur connecté
  getFormations(): any {
    this.apiService.get('teacher/myFormations')
    .subscribe((data) => {
      this.formations = data.data;
      console.log('formations data', this.formations);
    });
  }

  // recuperer la liste des rapports des toutes formations confondues
  public getReports() {
    this.apiService.get('report/reportsAvailableForTeacher' ).subscribe(data => {
      this.dataReport = this.allReports = data;
      console.log('data Report', this.dataReport);
      this.generateStudentsList();
      this.generateFormationsList();
    });
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
  
  generateFormationsList() {
    this.formations = [];
    for (let i = 0; i < this.dataReport.length; i++) {
      const formationtName = this.dataReport[i].formationName;
      const formationtId = this.dataReport[i].formationt_Id;
      const position = this.formations.map(function(e) { return e.name; }).indexOf(formationtName);
      if (position === -1)  {
        this.formations.push({
          name: formationtName,
          id: formationtId
        });
      }
    }
  }
  
  goBack() {
    this.location.back();
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

  // -------------------------- FILTRES ------------------------ //
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
    console.log('filterByStudent selectedDate ',  this.selectedDate);
    const filter = {
      studentId: (this.selectedStudent !== '0') ? this.selectedStudent : '',
      report_date: (this.selectedDate !== '0')?this.selectedDate:''
    }
    this.dataReport = this.filterPipe.transform(this.allReports, filter);
  }

  stateText() {
    return ( this.report.is_daily === 0) ? 'Hebdomadaire' : 'Journalier';
  }

  // -------------------------- DETAIL RAPPORTS - COMMENTAIRES ------------------------ //
  getComments() {
    this.apiService.get('getReport/reportId/ofFormation/formationId')
    .subscribe(data => {
      this.comments = data;
      console.log('getComents', this.comments);
    });
  }

}
// TODO
// alors pour récupérer les commentaire, tu récupère les commentaire par l'id du report, donc tu utilise cette route :
// getReport/reportId/ofFormation/formationId

// Ensuite pour la création d'un commentaire :
// reportComment/create
// tu as besoin d'envoyer :
// - report_id
// - text
