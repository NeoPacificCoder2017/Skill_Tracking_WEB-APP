import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { $ } from '../../../../node_modules/protractor';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-formation',
  templateUrl: './admin-formation.component.html',
  styleUrls: ['./admin-formation.component.css']
})
export class AdminFormationComponent implements OnInit {
  formation: any;
  modules: any;
  idFormation: any;
  dropDown: boolean;
  displayOff: string;
  displayOne: string;
  moduleName: string;
  environment = environment;
  tabSelected = 1;
  teachers: any;
  teachersAll: any;
  students: any;
  newModuleForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.moduleName = '';
  }

  ngOnInit() {
    this.newModuleForm = this.formBuilder.group({
      name: ['', Validators.required],
      teachers: ['', Validators.required],
      colors: ['', Validators.required],
      total_hour: ['', Validators.required]
    });
    this.formation = {};
    this.teachers = [];
    this.students = [];
    this.modules = [];
    this.route.queryParams
      .subscribe(params => {
        this.idFormation = params.idFormation;
        this.getFormation();
        this.getTeachers();
        this.getStudents();
        this.getModules();
        this.getTeachersAll();
      });
    this.displayOne = this.dropDown ? 'inline' : 'none';
  }

  goBack() {
    this.location.back();
  }

  public getFormation() {
    this.apiService.get('formation/' + this.idFormation)
      .subscribe((data) => {
        this.formation = data;
        console.log('getFormation', this.formation);
      });
  }

  private getTeachers() {
    this.apiService.get('getTeachersOfFormation/' + this.idFormation)
      .subscribe((data) => {
        this.teachers = data;
        console.log('getTeachers', this.teachers);
      });
  }
  public getTeachersAll() {
    this.apiService.get('users/teacher')
      .subscribe((data) => {
        this.teachersAll = data.data;
        console.log('teachersAll', this.teachersAll);
      });
  }

  private getStudents() {
    this.apiService.get('getStudentsOfAFormation/' + this.idFormation)
      .subscribe((data) => {
        this.students = data;
        console.log('getStudents', this.students);
      });
  }

  private getModules() {
    this.apiService.get('getModulesOfFormation/' + this.idFormation)
      .subscribe((data) => {
        this.modules = data;
        console.log('getModules', this.modules);
      });
  }

  goToStudentPage(studentId) {
    this.router.navigate(['/admin/formation/student'], {queryParams : { idFormation : this.idFormation, idStudent : studentId}});
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


  // convenience getter for easy access to form fields
  get module() { return this.newModuleForm.controls; }

  addModule(): any {
    this.submitted = true;
    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('name', this.module.name.value);
    uploadData.append('nameTeacher', this.module.id.value);
    uploadData.append('color', this.module.color.value);
    uploadData.append('total_hour', this.module.total_hour.value);

    console.log('uploadData', uploadData);
    this.apiService.upload('module/create', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
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
