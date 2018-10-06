import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})

export class TeacherDashboardComponent implements OnInit {

  listFormations: any;
  environment = environment;
  nameFormation: string;
  addPicture: string;
  dateAdd: number;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.getFormations();
  }

  goToFormation(idFormation) {
    console.log('goToFormation', idFormation);
    this.router.navigate(['/teacher/formation'], { queryParams: { idFormation: idFormation }});
  }

  public getFormations(): any {
    this.apiService.get('teacher/myFormations')
    .subscribe((data) => {
      this.listFormations = data;
      console.log('formations data', this.listFormations);
    });
  }

  addFormation() {
    this.apiService.post('formation/create',
      this.nameFormation
    )
    .subscribe((data: any) => {
      console.log('name', name);
      console.log('Module create', data);
    });
  }
}
