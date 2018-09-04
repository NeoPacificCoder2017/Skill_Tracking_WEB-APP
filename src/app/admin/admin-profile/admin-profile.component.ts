import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Location } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css']
})
export class AdminProfileComponent implements OnInit {

  listFormations: any;
  environment = environment;
  dataTeacher: any;
  public me: any;
  tabSelected = 1;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);
    this.getFormations();
  }

  goBack() {
    this.location.back();
  }


  public getFormations(): any {
    this.apiService.get('teacher/myFormations')
    .subscribe((data) => {
      this.listFormations = data.data;
      console.log('this.listFormations', this.listFormations);
    });
  }
}
