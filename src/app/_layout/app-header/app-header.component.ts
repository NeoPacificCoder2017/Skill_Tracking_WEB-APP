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
        {'title': 'Tableau de bord', 'icon': 'fa-home', 'url': 'dashboard'},
        {'title': 'Formations', 'icon': 'fa-graduation-cap', 'url': 'formations'},
        {
          'title': 'Utilisateurs',
          'icon': 'fa-user',
          'url': '',
          'submenus': [
            {'title': 'Administrateur', 'url': 'admin'},
            {'title': 'Formateurs', 'icon': 'fa-user', 'url': 'teachers'},
            {'title': 'Apprentis', 'icon': 'fa-user', 'url': 'students'},
            // {'title': 'Organisms', 'icon': 'fa-user', 'url': 'organisms'},
            // {'title': 'Entreprise', 'icon': 'fa-user', 'url': 'entreprise'}
          ]
        },
        {'title': 'Rapports', 'icon': 'fa-home', 'url': 'reports'},
      ]
    },
    {
      'name': 'teacher',
      'links': [
        {'title': 'Tableau de bord', 'icon': 'fa-home', 'url': 'dashboard'},
        // {"title": "Formations", "icon": "fa-wpforms", "url": "formations"},
        // {"title": "Modules", "icon": "fa-list-alt", "url": "modules"},
        {'title': 'Rapports', 'icon': 'fa-clipboard', 'url': 'reports'},
        {'title': 'Planning', 'icon': 'fa-calendar', 'url': 'planning'}
      ]
    },
    {
      'name': 'student',
      'links': [
        {'title': 'Tableau de bord', 'icon': 'fa-home', 'url': 'dashboard'},
        {'title': 'Rapports', 'icon': 'fa-clipboard', 'url': 'reports'},
        {'title': 'Planning', 'icon': 'fa-calendar', 'url': 'plannings'}
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
