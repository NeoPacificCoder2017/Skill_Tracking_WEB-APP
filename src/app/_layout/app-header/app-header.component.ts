import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  public me: any;
  environment = environment;
  allMenus = [
    null,
    {
      'name': 'admin',
      'links': [
        {'title': 'Dashboard', 'icon': 'fa-home', 'url': 'dashboard'},
        // {"title": "Formations", "icon": "fa-graduation-cap", "url": "formations"},
        {'title': 'Utilisateurs', 'icon': 'fa-user', },
        {'title': 'Formateurs', 'icon': 'fa-user', 'url': 'teachers'},
        {'title': 'Apprentis', 'icon': 'fa-user', 'url': 'students'}
      ]
    },
    {
      'name': 'teacher',
      'links': {
        1: {'title': 'Over Here', 'url': 'In This City'},
        2: {'title': 'Over Here', 'url': 'In This City'},
        3: {'title': 'Over Here', 'url': 'In This City'}
      }
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
