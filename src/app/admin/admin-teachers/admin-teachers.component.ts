import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-teachers',
  templateUrl: './admin-teachers.component.html',
  styleUrls: ['./admin-teachers.component.css']
})
export class AdminTeachersComponent implements OnInit {

  environment = environment;
  teachers: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('users/teacher').subscribe(
      data => {
        console.log('data', data);
        this.teachers = data.data;
      }
    )
  }

}
