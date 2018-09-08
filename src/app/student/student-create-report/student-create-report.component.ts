import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { throwIfEmpty } from '../../../../node_modules/rxjs/operators';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-student-create-report',
  templateUrl: './student-create-report.component.html',
  styleUrls: ['./student-create-report.component.css']
})
export class StudentCreateReportComponent implements OnInit {

  newReportForm: FormGroup;
  selected = 0;
  hovered = 0;
  readonly = false;
  placeHolderText: any;
  me: any;
  // options: any = {
  //   pluginsEnabled: ['image', 'link', 'codeView'],
  // };
  loading = false;
  submitted = false;
  isDaily = 0;

  constructor (
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private froalaEditorModule: FroalaEditorModule,
    private froalaViewModule: FroalaViewModule
  ) { }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);
    this.newReportForm = this.formBuilder.group({
      title: ['', Validators.required],
      rate: ['', Validators.required],
      text: ['', Validators.required],
      is_daily: ['', Validators.required],
      created_date: ['', Validators.required]
    });
  }
  get f() { return this.newReportForm.controls; }

  saveReport(): any {
    console.log('this.f', this.f);
    this.submitted = true;
    this.loading = true;
    const uploadData = new FormData();
    uploadData.append('title', this.f.title.value);
    console.log('title', this.f.title.value);
    uploadData.append('student_id', this.me.student_id);
    console.log('student_id', this.me.student_id);
    uploadData.append('rate', this.f.rate.value);
    console.log('rate', this.f.rate.value);
    uploadData.append('text', this.f.text.value);
    console.log('text', this.f.text.value);
    uploadData.append('is_daily', (this.f.is_daily.value) ? '1' : '0');
    console.log('is_daily', this.f.is_daily.value);
    uploadData.append('date', this.f.created_date.value);
    console.log('date', this.f.created_date.value);

    console.log('uploadData', uploadData);
    this.apiService.post('report/create', uploadData).subscribe(data => {
      // this.ngOnInit();
      console.log('sauvegardé');
    });
  }

}
