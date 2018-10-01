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

        this.apiService.get('progressionsBySkillsOfModule/' + this.idModule)
        .subscribe((data) => {
          console.log('getListSkill data', data);
          this.listSkill = data;
          console.log('getListSkill', this.listSkill);
        });

        // this.apiService.get('progressionsBySkillsOfModule')
        // .subscribe((data) => {
        //   this.progresseBySkill = data;
        //   console.log('progressionsBySkills', this.progresseBySkill);
        // });

      });
  }

  goBack() {
    this.location.back();
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

  // skillValidatedByAdmin(skillId, AdminValidation, skillIndex) {
  //   AdminValidation = (AdminValidation === 1) ? 0 : 1;
  //   console.log('AdminValidation skillId', skillId);
  //   console.log('AdminValidation AdminValidation', AdminValidation);
  //   this.skills[skillIndex].student_validation = AdminValidation;

  //   this.updateSkillsArray(skillId, AdminValidation);

  //   const datas = { student_validation: AdminValidation };

  //   this.apiService.put('progression/updateAdminValidation', datas)
  //   .subscribe(data => {
  //     console.log('skillValidatedByStudent data', data);
  //   });
  // }

  // updateSkillsArray(skillId, AdminValidation) {
  //   console.log('updateSkillsArray launched');
  //   console.log('updateSkillsArray skillId', skillId);
  //   console.log('updateSkillsArray this.allSkills[0]', this.allSkills[0]);
  //   for (let i = 0; i < this.allSkills.length; i++) {
  //     if (this.allSkills[i].id === skillId) {
  //       console.log('updateSkillsArray (this.allSkills[i].id === skillId OK');
  //       this.allSkills[i].progression.student_validation = AdminValidation;
  //       break;
  //     }
  //   }

  //   this.filterByModule(this.moduleSelected);

  //   for (let i = 0; i < this.dataStudent.length; i++) {
  //     for (let j = 0; j < this.dataStudent[i].module.skills.length; j++) {
  //       if (this.dataStudent[i].module.skills[j].id === skillId) {
  //         this.dataStudent[i].module.skills[j].progression.student_validation = AdminValidation;
  //         break;
  //       }
  //     }
  //   }
  // }

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
