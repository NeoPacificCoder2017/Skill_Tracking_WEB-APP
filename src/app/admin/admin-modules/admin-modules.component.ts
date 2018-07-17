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
  formation: any;
  listModules: any;
  module: any;
  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getModules();
    this.getFormation();
  }

  goToSkill(idSkill) {
    console.log('goToSkill', idSkill);
    this.router.navigate(['/admin/skills']);
  }

  /*================Methode GET============================*/
  public getFormation(idFormation): any {
    this.apiService.get('formations/' + idFormation)
    .subscribe((data) => {
      this.formation = data.data;
      console.log('formation data', this.formation);
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
