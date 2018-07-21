import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { $ } from '../../../../node_modules/protractor';

@Component({
  selector: 'app-admin-formation',
  templateUrl: './admin-formation.component.html',
  styleUrls: ['./admin-formation.component.css']
})
export class AdminFormationComponent implements OnInit {
  formation: any;
  listModules: any;
  idFormation: any;
  dropDown: boolean;
  displayOff: string;
  displayOne: string;
  moduleName: string;
  environment = environment;
  constructor(private apiService: ApiService, private router: Router, private http: HttpClient, private route: ActivatedRoute) {
    this.moduleName = '';
    this.formation = {};
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idFormation = params.idFormation;
        this.getFormation();
      });
    this.displayOne = this.dropDown ? 'inline' : 'none';
  }

  editeModule(idModule) {
    console.log('idModule', idModule);
    this.dropDown = !this.dropDown;
    this.displayOff = this.dropDown ? 'inline' : 'none';
    this.displayOne = this.dropDown ? 'inline' : 'inline';
  }

  goToSkill(idSkill) {
    console.log('goToSkill', idSkill);
    this.router.navigate(['/admin/skills']);
  }

  public getFormation(): any {
    this.apiService.get('formation/' + this.idFormation)
      .subscribe((data) => {
        this.formation = data;
        console.log('formation data', this.formation);
      });
    this.apiService.get('modules')
      .subscribe((data) => {
        this.listModules = data.data;
        console.log('listModules data', this.listModules);
      });

  }

  addModule(): any {
    console.log('moduleName', this.moduleName);
    this.apiService.post('module/create', this.moduleName)
      .subscribe((data: any) => {
        console.log('name', name);
        console.log('Module create', data);
      });
  }

  deleteModule(idModule): any {
    console.log('idModule', idModule);
    this.apiService.delete('module/' + { params: {idModule: idModule}})
      .subscribe((data) => {
        console.log('Module deleted');
      });
  }
}
