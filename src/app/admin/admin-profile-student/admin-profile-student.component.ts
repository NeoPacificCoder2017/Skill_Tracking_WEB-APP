import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-profile-student',
  templateUrl: './admin-profile-student.component.html',
  styleUrls: ['./admin-profile-student.component.css']
})
export class AdminProfileStudentComponent implements OnInit {

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

}
