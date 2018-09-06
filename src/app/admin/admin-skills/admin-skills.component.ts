import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

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
  progresseBySkill: any;
  skills: any;
  selectedSkills: number[] = [0];

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) {
      this.module = {};
      this.progresseBySkill = {};
      this.skills = {};
    }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.idModule = params.idModule;

        this.apiService.get('module/' + this.idModule)
        .subscribe((data) => {
          this.module = data;
          console.log('id :', this.idModule);
          console.log('module', this.module);
        });

        this.apiService.get('skillsByModule/' + this.idModule)
        .subscribe((data) => {
          this.listSkill = data[0].skills;
          console.log('getListSkill', this.listSkill);
        });

        this.apiService.get('progressionsBySkills')
        .subscribe((data) => {
          this.progresseBySkill = data;
          console.log('progressionsBySkills', this.progresseBySkill);
        });

      });
  }

  goBack() {
    this.location.back();
  }

  onChange(skillId) {
    console.log('onChange');
    const index = this.selectedSkills.indexOf(skillId);
    if (index === -1) {
      this.selectedSkills.push(skillId);
    } else {
      this.selectedSkills.splice(index, 1);
    }
  }

  isAdminValidated(skillId) {
    return this.selectedSkills.indexOf(skillId) >= 0;
  }

  stateText(skillId) {
    return (this.selectedSkills.indexOf(skillId) >= 0) ? 'oui' : 'non' ;
  }

  skillObligationByAdmin() {
    for (let i = 0; i < this.skills.length; i++ ) {
      if ( this.skills[i].progression.teacher_validation === 0) {
        // this.skillValidatedByTeacher(this.skills[i].id);
        //   this.stateText(this.skills[i].id);
      }
    }
  }
}
