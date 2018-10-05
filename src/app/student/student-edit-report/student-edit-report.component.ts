import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { Location } from '@angular/common';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@Component({
  selector: 'app-student-edit-report',
  templateUrl: './student-edit-report.component.html',
  styleUrls: ['./student-edit-report.component.css']
})
export class StudentEditReportComponent implements OnInit {

  reportId: any;
  report: any;
  reportForm: FormGroup;
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

  submitted = false;
  selectedRate = 0;

  constructor(private location: Location,
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
    .subscribe(params => {
      this.reportId = params.report;
    });
    this.me = JSON.parse(localStorage.getItem('user'));

    this.options1 = this.options2 = this.options3 = this.options4 = this.options5 = this.options6 = this.optionsDefault;
    this.options1.placeholderText = 'Que deviez-vous accomplir?';
    this.options2.placeholderText = 'Quels ont été vos succès?';
    this.options3.placeholderText = 'Qu\'avez-vous trouver de difficile?';
    this.options4.placeholderText = 'Quels outils et/ou méthodes avez-vous utilisé??';
    this.options5.placeholderText = 'De nouvelles compétences acquises?';
    this.options6.placeholderText = 'Quelles recommandations feriez-vous?';

    this.reportForm = this.formBuilder.group({
      title: ['', Validators.required],
      rate: ['', Validators.required],
      text1: ['', Validators.required],
      text2: ['', Validators.required],
      text3: ['', Validators.required],
      text4: ['', Validators.required],
      text5: ['', Validators.required],
      text6: ['', Validators.required],
      is_daily: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.getReportData();
  }

  getReportData() {
    this.apiService.get('reportofStudent/' + this.reportId).subscribe(data => {
      console.log('data Report', data);
      const texts = data.report_text.split('::://:::'); console.log(texts);
      this.reportForm.controls['title'].setValue(data.report_title);
      this.reportForm.controls['date'].setValue(data.report_date);
      this.reportForm.controls['is_daily'].setValue(data.report_is_daily);
      this.reportForm.controls['text1'].setValue(texts[0]);
      this.reportForm.controls['text2'].setValue(texts[1]);
      this.reportForm.controls['text3'].setValue(texts[2]);
      this.reportForm.controls['text4'].setValue(texts[3]);
      this.reportForm.controls['text5'].setValue(texts[4]);
      this.reportForm.controls['text6'].setValue(texts[5]);
      this.reportForm.controls['rate'].setValue(data.report_rate);
      this.selectedRate = data.report_rate;
    });
  }
  goBack() {
    this.location.back();
  }

  get f() { return this.reportForm.controls; }

  updateNotation(note) {
    this.selectedRate = note;
    this.reportForm.controls['rate'].setValue(note);
  }

  saveReport(): any {
    console.log('this.f', this.f);
    this.submitted = true;

    const text = this.f.text1.value +
    '::://:::' + this.f.text2.value +
    '::://:::' + this.f.text3.value +
    '::://:::' + this.f.text4.value +
    '::://:::' + this.f.text5.value +
    '::://:::' + this.f.text6.value + '::://:::';

    const datas = {
      'report_id' : this.reportId,
      'title' : this.f.title.value,
      'student_id' : this.me.student_id,
      'rate' : this.f.rate.value,
      'text' : text,
      'is_daily' : (this.f.is_daily.value) ? '1' : '0',
      'date' : this.f.date.value,
    };

    this.apiService.put('report', datas)
    .subscribe(data => {
      this.ngOnInit();
      console.log('sauvegardé');
    });
  }

}
