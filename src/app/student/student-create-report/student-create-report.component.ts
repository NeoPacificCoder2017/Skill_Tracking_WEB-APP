import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { throwIfEmpty } from '../../../../node_modules/rxjs/operators';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { Location } from '@angular/common';

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
  optionsDefault: any = {
    toolbarInline: true,
    charCounterCount: false,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    quickInsertButtons: ['embedly', 'table', 'ul', 'ol', 'hr'],
    quickInsertTags: ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre', 'blockquote']
  };

  options1: any;
  options2: any;
  options3: any;
  options4: any;
  options5: any;
  options6: any;

  loading = false;
  submitted = false;
  isDaily = 0;
  selectedRate = 0;

  constructor (
    private location: Location, private apiService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private froalaEditorModule: FroalaEditorModule,
    private froalaViewModule: FroalaViewModule
  ) { }

  ngOnInit() {
    this.me = JSON.parse(localStorage.getItem('user'));
    console.log('this.me', this.me);

    this.options1 = this.options2 = this.options3 = this.options4 = this.options5 = this.options6 = this.optionsDefault;
    this.options1.placeholderText = 'Que deviez-vous accomplir?';
    this.options2.placeholderText = 'Quels ont été vos succès?';
    this.options3.placeholderText = 'Qu\'avez-vous trouver de difficile?';
    this.options4.placeholderText = 'Quels outils et/ou méthodes avez-vous utilisé?';
    this.options5.placeholderText = 'De nouvelles compétences acquises?';
    this.options6.placeholderText = 'Quelles recommandations feriez-vous?';

    this.newReportForm = this.formBuilder.group({
      title: ['', Validators.required],
      rate: ['', Validators.required],
      text1: ['', Validators.required],
      text2: ['', Validators.required],
      text3: ['', Validators.required],
      text4: ['', Validators.required],
      text5: ['', Validators.required],
      text6: ['', Validators.required],
      is_daily: ['', Validators.required],
      created_date: ['', Validators.required]
    });
  }
  
  goBack() {
    this.location.back();
  }
  
  get f() { return this.newReportForm.controls; }

  updateNotation(note) {
    this.selectedRate = note;
    this.newReportForm.controls['rate'].setValue(note);
  }

  saveReport(): any {
    console.log('this.f', this.f);
    this.submitted = true;
    this.loading = true;

    const text = this.f.text1.value + '::://:::' +
    this.f.text2.value + '::://:::' +
    this.f.text3.value + '::://:::' +
    this.f.text4.value + '::://:::' +
    this.f.text5.value + '::://:::' +
    this.f.text6.value + '::://:::';

    const uploadData = new FormData();
    uploadData.append('title', this.f.title.value);
    uploadData.append('student_id', this.me.user_id);
    uploadData.append('rate', this.f.rate.value);
    uploadData.append('text', text);
    uploadData.append('is_daily', (this.f.is_daily.value) ? '1' : '0');
    uploadData.append('date', this.f.created_date.value);

    console.log('uploadData', uploadData);
    this.apiService.post('report/create', uploadData)
    .subscribe(data => {
      this.router.navigate(['student/reports']);
    });
  }

}
