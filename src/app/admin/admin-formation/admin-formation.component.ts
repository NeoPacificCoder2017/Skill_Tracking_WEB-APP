import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
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
  colorsPanel = ['#A0522D', '#CD5C5C', '#FF4500', '#008B8B', '#B8860B', '#32CD32',
  '#FFD700', '#48D1CC', '#87CEEB', '#FF69B4', '#CD5C5C', '#87CEFA', '#6495ED',
  '#DC143C', '#FF8C00', '#C71585', '#000000', '#118e2c', '#c43403', '#620793'];
  showColorsPanel = 0;
  selectedColor: string;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.moduleName = '';
  }

  ngOnInit() {
    this.newModuleForm = this.formBuilder.group({
      name: ['', Validators.required],
      teacher: ['', Validators.required],
      color: ['', Validators.required],
      total_hours: ['', Validators.required]
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
        this.getTeacherAll();
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
  public getTeacherAll() {
    this.apiService.get('users/teacher').subscribe(
      data => {
        this.teachersAll = data.data;
        console.log('teachersAll', this.teachersAll);
      }
    );
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
  get m() { return this.newModuleForm.controls; }

  addModule(): any {
    this.submitted = true;

    if (this.newModuleForm.invalid == null) {
      return;
    }
    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('name', this.m.name.value);
    uploadData.append('teacher', this.m.teacher.value);
<<<<<<< HEAD
    uploadData.append('color', this.m.selectedColor.value);
    uploadData.append('total_heure', this.m.total_heure.value);
=======
    uploadData.append('color', this.m.color.value);
    uploadData.append('total_hours', this.m.total_hours.value);
>>>>>>> f9bbf3340d2fec4b6b3fc223b2f42c879b11d111

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

  openColorsPanel() {
    this.showColorsPanel = 1;
    console.log('showColorPanel', this.showColorsPanel);
  }

  selectColor(index) {
    this.selectedColor = this.colorsPanel[index];
    // this.m.color.value = this.selectedColor;
    this.showColorsPanel = 0;
    console.log('index', index);
    console.log('selectedColor', this.selectedColor);
    console.log('showColorsPanel', this.showColorsPanel);
  }
}
