import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  environment = environment;
  users: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('users').subscribe(
      data => {
        console.log('data', data);
        this.users = data.data;
      }
    );
  }

}
