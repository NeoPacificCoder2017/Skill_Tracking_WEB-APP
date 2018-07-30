import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-admin-admins',
  templateUrl: './admin-admins.component.html',
  styleUrls: ['./admin-admins.component.css']
})
export class AdminAdminsComponent implements OnInit {
  environment = environment;
  admins: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('users/admin').subscribe(
      data => {
        console.log('data', data);
        this.admins = data.data;
      }
    );
  }

}
