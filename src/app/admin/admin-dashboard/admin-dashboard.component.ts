import { Component, OnInit } from '@angular/core';

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

  formatSubtitle = (percent: number): string => {
    if (percent >= 100) {
      return 'Congratulations!';
    } else if (percent >= 50) {
      return 'Half';
    } else if (percent > 0) {
      return 'Just began';
    } else {
      return 'Not started';
    }
  }
  constructor() { }

  ngOnInit() {
  }



}
