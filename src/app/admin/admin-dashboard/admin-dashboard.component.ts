import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  redirect = [null, 'admin', 'teacher', 'student'];

  listFormations = [
   {
     id: 1,
     name: 'NPC',
     logo: 'npc.jpg',
     start_at: '10/08/17',
     end_at: '18/12/18',
     nb: '12'
   },
   {
    id: 1,
    name: 'NPC',
    logo: 'npc.jpg',
    start_at: '10/08/17',
    end_at: '18/12/18',
    nb: '12'
  },
  {
    id: 1,
    name: 'NPC',
    logo: 'npc.jpg',
    start_at: '10/08/17',
    end_at: '18/12/18',
    nb: '12'
  },
  ];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('formations').subscribe(
      data => {
        console.log('data', data);
      }
    )
  }



}
