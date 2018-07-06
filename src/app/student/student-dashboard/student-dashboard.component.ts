import { Component, OnInit } from '@angular/core';

// import { NgCircleProgressModule } from 'ng-circle-progress';
@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
current = 75;
max = 100;

  constructor() { }

  ngOnInit() {
  }

}
