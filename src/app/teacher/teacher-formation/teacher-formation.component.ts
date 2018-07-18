import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-teacher-formation',
  templateUrl: './teacher-formation.component.html',
  styleUrls: ['./teacher-formation.component.css']
})
export class TeacherFormationComponent implements OnInit {
  listeEtudiants: any;
  idEtudiant: number;
  idFormation: number;

  // listeEtudiants = [
  //   {
  //     id: 1,
  //     avatar: 'avatar1',
  //     last_name: 'BOPBOP',
  //     first_name: 'Lolololo',
  //   },
  //   {
  //     id: 1,
  //     avatar: 'avatar1',
  //     last_name: 'BOPBOP',
  //     first_name: 'Lolololo',
  //   },
  //   {
  //     id: 1,
  //     avatar: 'avatar1',
  //     last_name: 'BOPBOP',
  //     first_name: 'Lolololo',
  //   },
  //   {
  //     id: 1,
  //     avatar: 'avatar1',
  //     last_name: 'BOPBOP',
  //     first_name: 'Lolololo',
  //   },
  //   {
  //     id: 1,
  //     avatar: 'avatar1',
  //     last_name: 'BOPBOP',
  //     first_name: 'Lolololo',
  //   },
  //   {
  //     id: 1,
  //     avatar: 'avatar1',
  //     last_name: 'BOPBOP',
  //     first_name: 'Lolololo',
  //   },
  //   {
  //     id: 1,
  //     avatar: 'avatar1',
  //     last_name: 'BOPBOP',
  //     first_name: 'Lolololo',
  //   },
  //   {
  //     id: 1,
  //     avatar: 'avatar1',
  //     last_name: 'BOPBOP',
  //     first_name: 'Lolololo',
  //   },
  //   {
  //     id: 1,
  //     avatar: 'avatar1',
  //     last_name: 'BOPBOP',
  //     first_name: 'Lolololo',
  //   }
  // ];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getEtudiants();
  }

  selectedEtudiant(idEtudiant) {
    console.log('selectedEtudiant', idEtudiant);
    this.router.navigate(['/teacher/student/' + idEtudiant]);
  }

  public getEtudiants(): any {
    this.route.queryParams
    .subscribe(params => {
      this.idFormation = params.idFormation;
    });
    this.apiService.get('getStudentsOfFormation/' + this.idFormation)
    .subscribe((data) => {
      console.log('idFormation', this.idFormation);
      this.listeEtudiants = data;
      console.log('students data', this.listeEtudiants);
    });
  }

}
