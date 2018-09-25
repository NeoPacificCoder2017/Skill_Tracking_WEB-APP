import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-report-detail',
  templateUrl: './admin-report-detail.component.html',
  styleUrls: ['./admin-report-detail.component.css']
})
export class AdminReportDetailComponent implements OnInit {

  constructor(private apiService: ApiService,
    private router: Router, private http: HttpClient, private formBuilder: FormBuilder, private ngZone: NgZone) { }

  ngOnInit() {
  }

  showFormation(idReport) {
    console.log('report detail', idReport);
    this.router.navigate(['/report-detail'], { queryParams: { idReport: idReport } });
  }

}
