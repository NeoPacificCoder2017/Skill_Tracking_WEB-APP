import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormationService } from '../../services/formation/formation.service';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})

export class TeacherDashboardComponent implements OnInit {
  listFormations: any;

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getFormations();
  }

  goToFormation(idFormation) {
    console.log('goToFormation', idFormation);
    this.router.navigate(['/teacher/formation']);
  }

  public getFormations(): any {
    this.apiService.get('formations')
    .subscribe((data) => {
      this.listFormations = data.data;
      console.log('formations data', this.listFormations);
    });
  }

  selectedFormationId(id: number) {
    this.router.navigate(['/teacher/formation' + id]);
  }
}
