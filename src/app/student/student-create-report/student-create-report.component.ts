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
  options: any;
  loading = false;
  submitted = false;

  constructor (
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private froalaEditorModule: FroalaEditorModule,
    private froalaViewModule: FroalaViewModule
  ) { }

  ngOnInit() {
    this.newReportForm = this.formBuilder.group({
      report_title: [''],
      report_rate: [''],
      text: ['']
    });
  }
  get f() { return this.newReportForm.controls; }

  saveReport(): any {
    this.submitted = true;
    this.loading = true;
    const created_date = this.f.created_date.value.split('/');
    const uploadData = new FormData;
    uploadData.append('report_title', this.f.report_title.value);
    uploadData.append('report_rate', this.f.report_rate.value);
    uploadData.append('text', this.f.text.value);

    console.log('uploaData', uploadData);
    this.apiService.upload('report/create', uploadData).subscribe(data => {
      this.ngOnInit();
    });
    console.log('sauvegarder');
  }

  updateReport() {
    return null;
  }
}
