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
    this.getFormations();

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
      this.dataReport = data;
      console.log('data Report', this.dataReport);
      this.generateStudentsList();
    });
  }

  // recupère la liste des étudiants
  generateStudentsList() {
    for (let i = 0; i < this.dataReport.length; i++) {
      const studentName = this.dataReport[i].studentFirstname + ' ' + this.dataReport[i].studentLastname;
      const studentId = this.dataReport[i].student_id;
      const position = this.students.map(function(e) { return e.studentName; }).indexOf(studentName);
      if (position === -1)  {
        this.students.push({
          studentName: studentName,
          studentId: studentId
        });
      }
    }

    console.log('ListStudent', this.students);
  }

  // -------------------------- FILTRES ------------------------ //
  // Mettre à jour la liste de recherche par étudiant

  filterReports() {
    console.log('filterByStudent studentId ',  this.selectedStudent);
    console.log('filterByDate  ',  this.selectedDate);
    console.log('filterByFormation  ',  this.selectedFormation);
    const filter = {
      studentId: this.selectedStudent,
      report_date: (this.selectedDate !== '0') ? this.selectedDate : ''
    };
    this.dataReport = this.filterPipe.transform(this.allReports, filter);
  }

  getSelectedStudentsSearch() {
    this.apiService.get('getStudentsOfAFormation/' + this.idFormation)
    .subscribe( data => {
      this.dataStudent = data;
      console.log('getStudentOfFormation data', this.dataStudent);
      }
    );
  }

  getReportsByFormation() {
    this.apiService.get('reportsByFormation/' + this.idFormation)
    .subscribe( data => {
      this.dataReport = data;
      console.log('getReportsByFormation data', this.dataReport);
    });
  }

  showDetailReport(idReport) {
    console.log('idReport ShowDetailReport', idReport);
    this.router.navigate(['teacher/reportDetail'], { queryParams: { idReport: idReport } });
  }

  // -------------------------- DETAIL RAPPORTS ------------------------ //
  goBack() {
    this.location.back();
  }

  viewReport(item) {
    this.displayViewReport = 1;
    console.log('displayViewReport', this.displayViewReport);
    this.report = item;
    this.report.report_text = this.report.report_text.split('::://:::');
  }

  closeViewReport() {
    this.displayViewReport = 0;
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
