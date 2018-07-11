import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  me : any;
  environment = environment;
  allMenus = [
    null,
    {
      "name": "admin",
      "links": {
        1: {"title": "Dashboard", "icon": "fa-home", "url": "dashboard"},
        2: {"title": "Formations", "icon": "fa-home", "url": "formations"},
        3: {"title": "Formateurs", "icon": "fa-home", "url": "formateurs"},
        4: {"title": "Apprentis", "icon": "fa-home", "url": "apprentis"}
      }
    },
    {
      "name": "teacher",
      "links": {
        1: {"title": "Over Here", "url": "In This City"},
        2: {"title": "Over Here", "url": "In This City"},
        3: {"title": "Over Here", "url": "In This City"}
      }
    },
    {
      "name": "student",
      "links": {
        1: {"title": "Over Here", "url": "In This City"},
        2: {"title": "Over Here", "url": "In This City"},
        3: {"title": "Over Here", "url": "In This City"}
      }
    }
  ];
  menu : any;

  constructor() { }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);

    this.menu = this.allMenus[this.me.user_type_id];
    console.log('this.menu',this.menu);
  }

}
