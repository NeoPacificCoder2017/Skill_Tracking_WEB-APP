import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-skills',
  templateUrl: './admin-skills.component.html',
  styleUrls: ['./admin-skills.component.css']
})

export class AdminSkillsComponent implements OnInit {
  listSkill: any;
  environment = environment;
  idModule: any;
  module: any;
  constructor(private apiService: ApiService, private router: Router, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idModule = params.idModule;
        this.getModule();
        this.getSkills();
      });
  }

  public getModule(): any {
    this.apiService.get('module/' + this.idModule)
      .subscribe((data) => {
        this.module = data;
        console.log('module data', this.module);
      });
  }

  public getSkills(): any {
    this.apiService.get('skillsByModule/' + this.idModule)
      .subscribe((data) => {
        this.listSkill = data.data;
        console.log('listSkill data', this.listSkill);
      });
  }
}
