import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
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
