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
    // this.options.froalaEditor({
    //   pluginsEnabled: ['image', 'link', 'codeView'],
    //   spellcheck: true
    // });

    this.newReportForm = this.formBuilder.group({
      title: ['', null],
      rate: ['', null],
      text: ['', null],
      is_daily: ['', null],
      created_date: ['', null]
    });
  }
  get f() { return this.newReportForm.controls; }

  saveReport(): any {
    console.log('this.f', this.f);
    this.submitted = true;
    this.loading = true;
    const created_date = this.f.created_date.value.split('/');
    const uploadData = new FormData();
    uploadData.append('title', this.f.title.value);
    uploadData.append('rate', this.f.rate.value);
    uploadData.append('text', this.f.text.value);
    uploadData.append('is_daily', this.f.is_daily.value);
    uploadData.append('date', created_date);

    console.log('uploadData', uploadData);
    this.apiService.post('report/create', uploadData).subscribe(data => {
      console.log('sauvegardé');
      this.ngOnInit();
    });
  }

}
