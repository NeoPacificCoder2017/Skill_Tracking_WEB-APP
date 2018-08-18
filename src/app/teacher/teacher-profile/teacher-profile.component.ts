import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-teacher-profile',
  templateUrl: './teacher-profile.component.html',
  styleUrls: ['./teacher-profile.component.css']
})
export class TeacherProfileComponent implements OnInit {

  environment = environment;
  dataTeacher: any;
  public me: any;

  constructor(private location: Location) { }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);
  }

  goBack() {
    this.location.back();
  }

}
