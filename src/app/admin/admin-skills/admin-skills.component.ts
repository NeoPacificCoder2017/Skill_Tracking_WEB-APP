import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  newSkillForm: FormGroup;
  loading = false;
  submitted = false;
  ValueIsMandotry: any = 0;
  allSkills = [];
  moduleSelected = 0;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
      this.module = {};
      this.progresseBySkill = {};
      this.skills = {};
    }

  ngOnInit() {
    this.newSkillForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.route.queryParams
      .subscribe(params => {
        this.idModule = params.idModule;

        this.apiService.get('module/' + this.idModule)
        .subscribe((data) => {
          this.module = data;
          console.log('id :', this.idModule);
          console.log('module', this.module);
        });

        this.getProgressionsBySkillsOfModule();
      });
  }

  goBack() {
    this.location.back();
  }

  getProgressionsBySkillsOfModule() {
    this.apiService.get('progressionsBySkillsOfModule/' + this.idModule)
    .subscribe((data) => {
    this.listSkill = data;
    console.log('getListSkill', this.listSkill);
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.newSkillForm.controls; }

  createSkill(): any {
    this.submitted = true;

    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('name', this.f.name.value);
    uploadData.append('module_id', this.idModule, );
    uploadData.append('is_mandatory', this.ValueIsMandotry);

    this.apiService.post('skill/create', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

  skillObligationByAdmin(skillId, AdminValidation, skillIndex) {
    AdminValidation = (AdminValidation === 1) ? 0 : 1;
    console.log('AdminValidation skillId', skillId);
    console.log('AdminValidation AdminValidation', AdminValidation);

    this.getProgressionsBySkillsOfModule();
    this.updateSkillsArray(skillId, AdminValidation);

    const datas = { isMandatory: AdminValidation, skill_id: skillId };

    this.apiService.put('isMandatoryUpdate', datas)
    .subscribe(data => {
      console.log('isMandatoryUpdate', data);
    });

    setTimeout(() => { this.filterByModule(this.moduleSelected); }, 1500);
  }

  updateSkillsArray(skillId, AdminValidation) {
    console.log('updateSkillsArray launched');
    console.log('updateSkillsArray skillId', skillId);
    console.log('updateSkillsArray this.allSkills[0]', this.allSkills[0]);
    for (let i = 0; i < this.allSkills.length; i++) {
      if (this.allSkills[i].id === skillId) {
        console.log('updateSkillsArray (this.allSkills[i].id === skillId OK');
        break;
      }
    }

    this.filterByModule(this.moduleSelected);
  }

  filterByModule(moduleId) {
    console.log('filterByModule moduleId', moduleId);
    // console.log('filterByModule this.allSkills', this.allSkills);
    this.skills = [];
    this.moduleSelected = moduleId;
    if (this.moduleSelected === 0) {
      this.skills = this.allSkills;
    } else {
      console.log('filterByModule moduleId', moduleId);
      for (let i = 0; i < this.allSkills.length; i++) {
        if (this.allSkills[i].module_id === this.moduleSelected) {
          this.skills.push(this.allSkills[i]);
        }
      }
    }
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

  deletedSkill(idSkill): any {
    this.apiService.delete('skill/' + idSkill)
    .subscribe(data => {
      this.ngOnInit();
      console.log('SkillDeleted:', data);
    });
  }
}
