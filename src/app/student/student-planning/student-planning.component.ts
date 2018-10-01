import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-planning',
  templateUrl: './student-planning.component.html',
  styleUrls: ['./student-planning.component.css']
})
export class StudentPlanningComponent implements OnInit {

  page = 1;
  calendar: any;
  environment = environment;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router,
    private http: HttpClient, private route: ActivatedRoute) { }

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
