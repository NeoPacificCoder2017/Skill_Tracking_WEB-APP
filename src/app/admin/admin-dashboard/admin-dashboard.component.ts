import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  redirect = [null, 'admin', 'teacher', 'student'];
  formations: {};
  formation: any;
  environment = environment;
  newFormationForm: FormGroup;
  loading = false;
  submitted = false;
  newFormationImage: File;

  totalFormations: Number;
  totalStudents: Number;
  totalTeachers: Number;
  totalModules: Number;
  totalSkills: Number;
  totalSkillsValidatedByStudents: Number;
  totalSkillsValidatedByTeachers: Number;

  progression = {};
  teachersDataGraph = [];
  studentsDataGraph = [];
  chartBarOptions = {};

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private ngZone: NgZone) {
    // this.formations = {};
  }
  ngOnInit() {
    this.newFormationForm = this.formBuilder.group({
        name: ['', Validators.required],
        start_at: ['', Validators.required],
        end_at: ['', Validators.required]
    });
    this.apiService.get('getAllFormationsForAdmin').subscribe(
      data => {
        console.log('data', data);
        this.formations = data;
      }
    );
    this.apiService.get('getTotalFormations').subscribe(data => {this.totalFormations = data;});
    this.apiService.get('getTotalStudents').subscribe(data => {this.totalStudents = data;});
    this.apiService.get('getTotalTeachers').subscribe(data => {this.totalTeachers = data;});
    this.apiService.get('getTotalModules').subscribe(data => {this.totalModules = data;});
    this.apiService.get('getTotalSkills').subscribe(data => {this.totalSkills = data;});
    this.apiService.get('getTotalSkillsValidatedByStudents').subscribe(data => {this.totalSkillsValidatedByStudents = data;});
    this.apiService.get('getTotalSkillsValidatedByTeachers').subscribe(data => {this.totalSkillsValidatedByTeachers = data;});
  
    this.progression = {
      teacher_validated: 40,
      student_validated: 20,
      skills: 80
    }

    this.studentsDataGraph = [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75,  b: 65 },
      { y: '2008', a: 50,  b: 40 },
      { y: '2009', a: 75,  b: 65 },
      { y: '2010', a: 50,  b: 40 },
      { y: '2011', a: 75,  b: 65 },
      { y: '2012', a: 100, b: 90 }
    ];

    this.teachersDataGraph = [
      { y: '2006', a: 100, b: 90 },
      { y: '2007', a: 75,  b: 65 },
      { y: '2008', a: 50,  b: 40 },
      { y: '2009', a: 75,  b: 65 },
      { y: '2010', a: 50,  b: 40 },
      { y: '2011', a: 75,  b: 65 },
      { y: '2012', a: 100, b: 90 }
    ];

    this.chartBarOptions = {
      barColors: ['#F00','#FF0']
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.newFormationForm.controls; }

  onFileChanged(event) {
    console.log(event);
    this.newFormationImage = event.target.files[0];
  }

  showFormation(idFormation) {
    console.log('Formation', idFormation);
    this.router.navigate(['/admin/formation'], { queryParams: { idFormation: idFormation } });
  }


  createFormation(): any {
    this.submitted = true;

    if (this.newFormationForm.invalid && this.newFormationImage == null) {
        return;
    }

    this.loading = true;
    const start_at = this.f.start_at.value.split('/');
    const end_at = this.f.end_at.value.split('/');
    const uploadData = new FormData();
    uploadData.append('name', this.f.name.value);
    uploadData.append('start_at', start_at[2]+'-'+start_at[1]+'-'+start_at[0]+' 00:00:00:00');
    uploadData.append('end_at', end_at[2]+'-'+end_at[1]+'-'+end_at[0]+' 00:00:00:00');
    uploadData.append('logo', this.newFormationImage, this.newFormationImage.name);

    console.log('uploadData', uploadData);
    console.log('this.newFormationImage',this.newFormationImage)
    this.apiService.upload('formation/create', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

  deleteFormation(idFormation): any {
    this.apiService.delete('formation/' + idFormation)
    .subscribe(data => {
      this.ngOnInit();
    });
  }

}
