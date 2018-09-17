import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-admin-plannings',
  templateUrl: './admin-plannings.component.html',
  styleUrls: ['./admin-plannings.component.css']
})
export class AdminPlanningsComponent implements OnInit {
  environment = environment;
  calendars: any;
  formations: any;
  newPlanningForm: FormGroup;
  loading = false;
  submitted = false;
  filename: File;
  constructor(private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.newPlanningForm = this.formBuilder.group({
      formation_id: ['', Validators.required],
      file_name: ['', Validators.required],
    });
    this.apiService.get('calendars')
    .subscribe((data) => {
      this.calendars = data.data;
      console.log('calendars data', this.calendars);
    });
    this.formationAll();
  }

  private formationAll() {
    this.apiService.get('formations')
    .subscribe((data) => {
      this.formations = data.data;
      console.log('formations data', this.formations);
    });
  }

  // convenience getter for easy access to form fields
  get plan() { return this.newPlanningForm.controls; }

  onFileChanged(event) {
    console.log(event);
    this.filename = event.target.files[0];
  }

  createCalendar(): any {
    this.submitted = true;
    if (this.newPlanningForm.invalid && this.filename == null) {
        return;
    }

    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('formation', this.plan.formation_id.value);
    uploadData.append('description', this.plan.file_name.value);
    uploadData.append('url', this.filename, this.filename.name);

    console.log('uploadData', uploadData);
    console.log('this.filename', this.filename);
    this.apiService.upload('calendar/create', uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

  editeCalendar(idCalendar): any {
    this.submitted = true;
    if (this.newPlanningForm.invalid && this.filename == null) {
        return;
    }

    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('formation', this.plan.formation_id.value);
    uploadData.append('description', this.plan.file_name.value);
    uploadData.append('url', this.filename, this.filename.name);

    console.log('uploadData', uploadData);
    console.log('this.filename', this.filename);
    this.apiService.upload('calendar/' + idCalendar, uploadData)
    .subscribe(data => {
      const element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
      element.click();
      this.ngOnInit();
    });
  }

  deleteCalendar(idCalendar): any {
    this.apiService.delete('calendar/' + idCalendar)
    .subscribe(data => {
      this.ngOnInit();
    });
  }

}
