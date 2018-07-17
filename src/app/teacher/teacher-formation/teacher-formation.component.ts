import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-formation',
  templateUrl: './teacher-formation.component.html',
  styleUrls: ['./teacher-formation.component.css']
})
export class TeacherFormationComponent implements OnInit {
  listeEtudiant: any;
  idEtudiant: number;

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getEtudiants();
  }

  selectedEtudiant(idEtudiant) {
    console.log('selectedEtudiant', idEtudiant);
    this.router.navigate(['/student']);
  }

  public getEtudiants() {
    this.apiService.get('students')
    .subscribe((data) => {
      console.log('data', data);
      this.listeEtudiant = data.data;
      console.log('students data', this.listeEtudiant);
    });
  }

}
