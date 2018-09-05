import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
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
  pdfSrc = 'http://skillstracking.motjo.io/uploads/calendars/npc.pdf';

  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getCalendar();
  }

  getCalendar() {
    this.apiService.get('teachers/calendar')
    .subscribe((data) => {
      this.calendars = data.data;
      console.log('calendars data', this.calendars);
    });
  }
}
