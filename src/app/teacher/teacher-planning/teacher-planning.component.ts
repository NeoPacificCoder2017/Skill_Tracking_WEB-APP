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
  formationId: number;
  filePdf = '';


  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.queryParams
    //   .subscribe(params => {
    //     this.formationId = params.formationId;
    //     console.log('this.formationId', this.formationId);
    //   });
    this.getCalendar();
  }

  getCalendar() {
    this.apiService.get('teachers/calendar')
    .subscribe((data) => {
      this.calendars = data;
      console.log('calendars data', this.calendars);
    });
  }

  viewCalendar() {
    if (typeof (FileReader) !== 'undefined' ) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.filePdf = e.target.result;
      };
    }
  }
}
