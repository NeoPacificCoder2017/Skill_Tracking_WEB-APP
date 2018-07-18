import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-admin-formation',
  templateUrl: './admin-formation.component.html',
  styleUrls: ['./admin-formation.component.css']
})
export class AdminFormationComponent implements OnInit {
  formation: any;
  listModules: any;
  module: any;

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getModules();
    this.getFormation(idFormation);
  }

  goToSkill(idSkill) {
    console.log('goToSkill', idSkill);
    this.router.navigate(['/admin/skills']);
  }

  /*================Methode GET============================*/
  public getFormation(idFormation): any {
    this.apiService.get('/admin/formation/' + idFormation)
    .subscribe((data) => {
      this.formation = data.data;
      console.log('/admin/formation/ data', this.formation);
    });
  }

  public getModules(): any {
    this.apiService.get('modules')
    .subscribe((data) => {
      this.listModules = data.data;
      console.log('modules data', this.listModules);
    });
  }

  /*================METHODE POST======================================*/

  public postModul(): any {
    this.apiService.post('module/create')
    .subscribe((data) => {
      this.module = data.data;
      console.log('module data', this.module);
    });
  }

}
