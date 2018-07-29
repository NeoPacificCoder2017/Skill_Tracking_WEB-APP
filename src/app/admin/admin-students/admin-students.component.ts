import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit {
  environment = environment;
  students: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('users/student').subscribe(
      data => {
        console.log('data', data);
        this.students = data.data;
      }
    );
  }
}
