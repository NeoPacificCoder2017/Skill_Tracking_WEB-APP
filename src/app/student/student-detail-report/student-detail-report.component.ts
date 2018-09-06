import { Component, OnInit } from '@angular/core';
// import { $ } from '../../../../node_modules/protractor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';

@Component({
  selector: 'app-student-detail-report',
  templateUrl: './student-detail-report.component.html',
  styleUrls: ['./student-detail-report.component.css']
})
export class StudentDetailReportComponent implements OnInit {

  dataDetailReport: any;

  constructor(private apiService: ApiService, private formBuilder: FormBuilder, private router: Router ) {}

  ngOnInit() {

  }

}

