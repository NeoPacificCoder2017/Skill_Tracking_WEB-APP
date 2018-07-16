import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
@Component({
  selector: 'app-admin-modules',
  templateUrl: './admin-modules.component.html',
  styleUrls: ['./admin-modules.component.css']
})
export class AdminModulesComponent implements OnInit {
  listFormations: any;
  listModules: any;
  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getModules();
    this.getFormations();
  }

  goToCompetence(idCompetence) {
    console.log('goToCompetence', idCompetence);
    this.router.navigate(['/admin/competences']);
  }

  public getFormations(): any {
    this.apiService.get('formations')
    .subscribe((data) => {
      this.listFormations = data.data;
      console.log('formations data', this.listFormations);
    });
  }

  public getModules(): any {
    this.apiService.get('modules')
    .subscribe((data) => {
      this.listModules = data.data;
      console.log('modules data', this.listModules);
    });
  }

}
