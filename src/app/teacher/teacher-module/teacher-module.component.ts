import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-teacher-module',
  templateUrl: './teacher-module.component.html',
  styleUrls: ['./teacher-module.component.css']
})
export class TeacherModuleComponent implements OnInit {
  listeModules: any;
  idModule: number;

  constructor(private apiService: ApiService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.getModules();
  }

  selectedModule(idModule) {
    console.log('selectedModule', idModule);
    this.router.navigate(['/module']);
  }

  public getModules() {
    this.apiService.get('modules')
    .subscribe((data) => {
      console.log('data', data);
      this.listeModules = data.data;
      console.log('students data', this.listeModules);
    });
  }

}
