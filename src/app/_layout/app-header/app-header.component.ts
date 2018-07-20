import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

<<<<<<< HEAD
  public me: any;
=======
  me: any;
>>>>>>> b31f8b9fd5be46b48a7958b09b3979347edf9123
  environment = environment;
  allMenus = [
    null,
    {
      'name': 'admin',
      'links': [
        {'title': 'Dashboard', 'icon': 'fa-home', 'url': 'dashboard'},
        // {"title": "Formations", "icon": "fa-graduation-cap", "url": "formations"},
        {'title': 'Formateurs', 'icon': 'fa-user', 'url': 'teachers'},
        {'title': 'Apprentis', 'icon': 'fa-user', 'url': 'students'}
      ]
    },
    {
<<<<<<< HEAD
      'name': 'teacher',
      'links': {
        1: {'title': 'Over Here', 'url': 'In This City'},
        2: {'title': 'Over Here', 'url': 'In This City'},
        3: {'title': 'Over Here', 'url': 'In This City'}
      }
=======
      "name": "teacher",
      "links": [
        {"title": "Dashboard", "icon": "fa-home", "url": "dashboard"},
        // {"title": "Formations", "icon": "fa-wpforms", "url": "formations"},
        // {"title": "Modules", "icon": "fa-list-alt", "url": "modules"},
        {"title": "Reports", "icon": "fa-clipboard", "url": "reports"},
        {"title": "Planning", "icon": "fa-calendar", "url": "planning"}
      ]
>>>>>>> b31f8b9fd5be46b48a7958b09b3979347edf9123
    },
    {
      'name': 'student',
      'links': [
        {'title': 'Dashboard', 'icon': 'fa-home', 'url': 'dashboard'},
        {'title': 'Rapports', 'icon': 'fa-home', 'url': 'reports'},
        {'title': 'Planning', 'icon': 'fa-home', 'url': 'plannings'}
      ]
    }
  ];
  menus: any;
  menuPrefix: any;

  constructor() { }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);
    this.menuPrefix = this.allMenus[this.me.user_type_id].name;
    this.menus = this.allMenus[this.me.user_type_id].links;
    console.log('this.menu', this.menus);
  }

}
