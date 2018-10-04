import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterPipe } from 'ngx-filter-pipe';

@Component({
  selector: 'app-teacher-reports',
  templateUrl: './teacher-reports.component.html',
  styleUrls: ['./teacher-reports.component.css']
})
export class TeacherReportsComponent implements OnInit {

  formations: any;
  formation: any;
  selectedFormation: any;
  idFormation: any;

  me: any;

  dataReport: any;
  report: any;
  idReport: number;

  dataStudent: any;
  students = [];
  selectedStudent: any;

  comments: any;

  constructor(
    private apiService: ApiService,
    private filter: FilterPipe,
    private route: ActivatedRoute,
    private router: Router,
  ) {
      this.formation = {};
      this.report = {title : '', rate : '', text : ''};
      this.comments = {};
    }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);

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
    console.log('generateStudentsList this.dataReport', this.dataReport);
    for (let i = 0; i < this.dataReport.length; i++) {
        const studentName = this.dataReport[i].studentFirstname + ' ' + this.dataReport[i].studentLastname;
        console.log('studentName: ', studentName);
        if (this.students.indexOf(studentName) === -1)  {
          this.students.push(studentName);
        }
    }
    console.log('generateStudentsList this.students', this.students);
  }

  // -------------------------- FILTRES ------------------------ //
  // Mettre à jour la liste de recherche par étudiant
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

}
// TODO
// alors pour récupérer les commentaire, tu récupère les commentaire par l'id du report, donc tu utilise cette route :
// getReport/reportId/ofFormation/formationId

// Ensuite pour la création d'un commentaire :
// reportComment/create
// tu as besoin d'envoyer :
// - report_id
// - text
