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

  students: any;
  idFormation: number;
  formation: any; // formation détail
  environment = environment;

  constructor(private location: Location, private route: ActivatedRoute, private apiService: ApiService, private router: Router, private http: HttpClient) {
    this.formation = {};
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idFormation = params.idFormation;
        this.getStudents();
      });
  }

  backClicked() {
    this.location.back();
  }

  showStudent(idStudent) {
    console.log('selectedEtudiant', idStudent);
    this.router.navigate(['/teacher/student'], { queryParams: { idFormation: this.idFormation, idStudent: idStudent } });
  }

  public getStudents(): any {
    console.log('idFormation', this.idFormation);
    this.apiService.get('formation/' + this.idFormation)
      .subscribe((data) => {
        this.formation = data;
        console.log('info formation', this.formation);
        this.apiService.get('getStudentsOfFormation/' + this.idFormation)
          .subscribe((studentData) => {
            console.log('idFormation', this.idFormation);
            this.students = studentData;
            console.log('students data', this.students);
          });
      });
  }

}
