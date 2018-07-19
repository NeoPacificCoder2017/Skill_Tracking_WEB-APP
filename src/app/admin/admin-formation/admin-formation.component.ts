import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-formation',
  templateUrl: './admin-formation.component.html',
  styleUrls: ['./admin-formation.component.css']
})
export class AdminFormationComponent implements OnInit {
  formation: any;
  listModules: any;
  idFormation: any;
  environment = environment;
  constructor(private apiService: ApiService, private router: Router, private http: HttpClient, private route: ActivatedRoute) {
    // this.formation.start_at = null;
    // this.formation.logo = null;
    // this.formation.end_at = null;
    // this.formation.name = null;
  }

  ngOnInit() {
    this.getFormation();
    document.getElementsByClassName('initHide').style.display = 'none';
  }


  goToSkill(idSkill) {
    console.log('goToSkill', idSkill);
    this.router.navigate(['/admin/skills']);
  }

  public getFormation(): any {
    this.route.queryParams
      .subscribe(params => {
        this.idFormation = params.idFormation;
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
      });

  }


}
