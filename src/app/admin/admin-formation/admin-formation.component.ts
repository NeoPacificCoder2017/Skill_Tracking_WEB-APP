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
  newFormationImage: File;
  newFormationForm: FormGroup;
  formations: any;
  formation: any;
  modules: any;
  calendars: any;
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
  newPlanningForm: FormGroup;
  filename: File;
  formation_id: any = 1;
  totalSkills: any;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    this.moduleName = '';
  }

  ngOnInit() {
    this.newFormationForm = this.formBuilder.group({
      name: ['', Validators.required],
      start_at: ['', Validators.required],
      end_at: ['', Validators.required]
  });
    this.newModuleForm = this.formBuilder.group({
      name: ['', Validators.required],
      teacher: ['', Validators.required],
      color: ['', Validators.required],
      total_hours: ['', Validators.required]
    });
    this.newPlanningForm = this.formBuilder.group({
      file_name: ['', Validators.required],
    });
    this.formation = {};
    this.teachers = [];
    this.students = [];
    this.modules = [];
    this.calendars = [];
    this.route.queryParams
      .subscribe(params => {
        this.idFormation = params.idFormation;
        this.getFormation();
        this.getTeachers();
        this.getStudents();
        this.getModules();
        this.getTeacherAll();
        this.getPlannings();
        this.formationAll();
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

  private formationAll() {
    this.apiService.get('formations')
    .subscribe((data) => {
      this.formations = data.data;
      console.log('formations data', this.formations);
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

  private getPlannings() {
    this.apiService.get('getPlanningForAdmin')
      .subscribe((data) => {
        this.calendars = data;
        console.log('getPlannings', this.calendars);
      });
  }

  goToStudentPage(studentId) {
    this.router.navigate(['/admin/studentModule'], {queryParams : { idFormation : this.idFormation, idStudent : studentId}});
  }

  profileTeacher(idTeacher) {
    console.log('teacher', idTeacher);
    this.router.navigate(['admin/profileTeacher'], { queryParams: { idTeacher: idTeacher } });
  }

  editeModule(idModule) {
    console.log('idModule', idModule);
    this.dropDown = !this.dropDown;
    this.displayOff = this.dropDown ? 'inline' : 'none';
    this.displayOne = this.dropDown ? 'inline' : 'inline';
  }

  goToSkill(moduleId) {
    console.log('goToSkill', moduleId);
    this.router.navigate(['/admin/skills'], { queryParams: { idModule: moduleId } });
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
    uploadData.append('color', this.m.color.value);
    uploadData.append('total_hours', this.m.total_hours.value);

    console.log('uploadData', uploadData);
    this.apiService.upload('module/create', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

  // convenience getter for easy access to form fields
  get plan() { return this.newPlanningForm.controls; }

  onFileChanged(event) {
    console.log(event);
    this.filename = event.target.files[0];
  }

  createCalendar(): any {
    this.submitted = true;
    if (this.newPlanningForm.invalid && this.filename == null) {
        return;
    }

    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('formation_id', this.formation_id);
    uploadData.append('file_name', this.plan.file_name.value);
    uploadData.append('file_url', this.filename, this.filename.name);

    console.log('uploadData', uploadData);
    console.log('this.filename', this.filename);
    this.apiService.upload('calendar/create', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

   // convenience getter for easy access to form fields
   get f() { return this.newFormationForm.controls; }

   onFileFormationChanged(event) {
     console.log(event);
     this.newFormationImage = event.target.files[0];
   }

  editeFormation(idFormation): any {
    this.submitted = true;
    if (this.newFormationForm.invalid && this.newFormationImage == null) {
        return;
    }

    this.loading = true;
    const start_at = this.f.start_at.value.split('/');
    const end_at = this.f.end_at.value.split('/');
    const uploadData = new FormData();
    uploadData.append('name', this.f.name.value);
    uploadData.append('start_at', start_at[2] + '-' + start_at[1] + '-' + start_at[0] + ' 00:00:00:00');
    uploadData.append('end_at', end_at[2] + '-' + end_at[1] + '-' + end_at[0] + ' 00:00:00:00');
    uploadData.append('logo', this.newFormationImage, this.newFormationImage.name);

    console.log('uploadData', uploadData);
    console.log('this.newFormationImage', this.newFormationImage);
    this.apiService.upload('formation/' + idFormation, uploadData)
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
    console.log('this.newModuleForm.controls', this.newModuleForm.controls);
    this.selectedColor = this.colorsPanel[index];
    // this.newModuleForm.controls.color.value = this.selectedColor;
    this.showColorsPanel = 0;
    console.log('index', index);
    console.log('selectedColor', this.selectedColor);
    console.log('showColorsPanel', this.showColorsPanel);
  }
}
