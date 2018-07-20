import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher-formation',
  templateUrl: './teacher-formation.component.html',
  styleUrls: ['./teacher-formation.component.css']
})
export class TeacherFormationComponent implements OnInit {
  listeEtudiants: any;
  idEtudiant: number;
  idFormation: number;
  formation: any; // formation détail
  environnement = environment;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idFormation = params.idFormation;
        this.getEtudiants();
      });
  }

  backClicked() {
    this.location.back();
  }

  selectedEtudiant(idStudent) {
    console.log('selectedEtudiant', idStudent);
    this.router.navigate(['/teacher/student'], { queryParams: { idFormation: this.idFormation, idStudent: idStudent } });
  }

  public getEtudiants(): any {
    console.log('idFormation', this.idFormation);
    this.apiService.get('formationdetail/' + this.idFormation)
      .subscribe((data) => {
        this.formation = data;
        console.log('info formation', this.formation);
        this.apiService.get('getStudentsOfFormation/' + this.idFormation)
          .subscribe((studentData) => {
            console.log('idFormation', this.idFormation);
            this.listeEtudiants = studentData;
            console.log('students data', this.listeEtudiants);
          });
      });
  }

}
