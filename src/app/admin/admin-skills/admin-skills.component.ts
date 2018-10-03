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
  skillsIsMandatory: number[] = [0];
  newSkillForm: FormGroup;
  loading = false;
  submitted = false;
  ValueIsMandotry = "0";

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
      for (let i = 0; i < this.listSkill.length; i++) {
        if (this.listSkill[i].is_mandatory) {
          this.skillsIsMandatory.push(this.listSkill[i].id);
        }
      }
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

  updateIsMandatory(index) {
    const is_mandatory = (this.listSkill[index].is_mandatory === 1) ? 0 : 1;
    console.log('updateIsMandatory is_mandatory', is_mandatory);
    this.listSkill[index].is_mandatory = is_mandatory;
    
    const datas = { isMandatory: is_mandatory, skill_id: this.listSkill[index].id };

    this.apiService.put('isMandatoryUpdate', datas)
    .subscribe(data => {
      console.log('isMandatoryUpdate', data);
    });
  }

  onChange(skillId) {
    console.log('onChange');
    const index = this.skillsIsMandatory.indexOf(skillId);
    if (index === -1) {
      this.skillsIsMandatory.push(skillId);
    } else {
      this.skillsIsMandatory.splice(index, 1);
    }
  }

  isMandatory(skillId) {
    return this.skillsIsMandatory.indexOf(skillId) >= 0;
  }

  stateText(skillId) {
    return (this.skillsIsMandatory.indexOf(skillId) >= 0) ? 'oui' : 'non' ;
  }
}
