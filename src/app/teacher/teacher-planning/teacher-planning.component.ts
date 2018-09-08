import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-teacher-planning',
  templateUrl: './teacher-planning.component.html',
  styleUrls: ['./teacher-planning.component.css']
})
export class TeacherPlanningComponent implements OnInit {

  page = 1;
  environment = environment;
  calendars: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getCalendar();
  }

  getCalendar() {
    this.apiService.get('teachers/calendar')
    .subscribe((data) => {
      this.calendars = data;
      console.log('calendars data', this.calendars);
    });
  }
}
