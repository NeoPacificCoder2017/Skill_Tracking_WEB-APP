import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-student-planning',
  templateUrl: './student-planning.component.html',
  styleUrls: ['./student-planning.component.css']
})
export class StudentPlanningComponent implements OnInit {

  calendar: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getCalendar();
  }

  getCalendar() {
    this.apiService.get('students/calendar').subscribe((data) => {
      this.calendar = data.data;
      console.log('calendar data', this.calendar);
    });
  }

}
