import { Component, OnInit, NgZone } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../services/api/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teacher-report-detail',
  templateUrl: './teacher-report-detail.component.html',
  styleUrls: ['./teacher-report-detail.component.css']
})
export class TeacherReportDetailComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private ngZone: NgZone
  ) {
   }

  ngOnInit() {
  }


}
