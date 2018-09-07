import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

import { AppRoutingModule } from './/app-routing.module';

import { ApiService } from './services/api/api.service';

import { AppHeaderComponent } from './_layout/app-header/app-header.component';
import { AppFooterComponent } from './_layout/app-footer/app-footer.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';

// Npm
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { LoginComponent } from './login/login.component';
/** STUDENT */
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentReportComponent } from './student/student-report/student-report.component';
import { StudentDetailReportComponent } from './student/student-detail-report/student-detail-report.component';
import { StudentCreateReportComponent } from './student/student-create-report/student-create-report.component';
import { StudentPlanningComponent } from './student/student-planning/student-planning.component';

/** TEACHER */
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherFormationComponent } from './teacher/teacher-formation/teacher-formation.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { TeacherPlanningComponent } from './teacher/teacher-planning/teacher-planning.component';
import { TeacherModuleComponent } from './teacher/teacher-module/teacher-module.component';
import { TeacherStudentComponent } from './teacher/teacher-student/teacher-student.component';
import { TeacherReportsComponent } from './teacher/teacher-reports/teacher-reports.component';

/** ADMIN */
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminFormationsComponent } from './admin/admin-formations/admin-formations.component';
import { AdminTeachersComponent } from './admin/admin-teachers/admin-teachers.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminSkillsComponent } from './admin/admin-skills/admin-skills.component';
import { AdminFormationComponent } from './admin/admin-formation/admin-formation.component';
import { AdminFormationStudentComponent } from './admin/admin-formation-student/admin-formation-student.component';
import { AdminAdminsComponent } from './admin/admin-admins/admin-admins.component';
import { AdminFormationTeacherComponent } from './admin/admin-formation-teacher/admin-formation-teacher.component';
import { AdminPlanningsComponent } from './admin/admin-plannings/admin-plannings.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AdminProfileStudentComponent } from './admin/admin-profile-student/admin-profile-student.component';
import { AdminProfileTeacherComponent } from './admin/admin-profile-teacher/admin-profile-teacher.component';
import { AdminProfileAdminComponent } from './admin/admin-profile-admin/admin-profile-admin.component';
import { AdminStudentModuleComponent } from './admin/admin-student-module/admin-student-module.component';

import { ChartjsModule } from '@ctrl/ngx-chartjs';
<<<<<<< HEAD
import { TeacherPlanningComponent } from './teacher/teacher-planning/teacher-planning.component';
=======
import { AtomSpinnerModule } from 'angular-epic-spinners';

>>>>>>> 55c8873aeba95fac0da0d7b388a4bfb7752b6cb0

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AppHeaderComponent,
    AppFooterComponent,
    SiteFooterComponent,
    SiteHeaderComponent,
    SiteLayoutComponent,
    LoginComponent,
    StudentDashboardComponent,
    StudentReportComponent,
    StudentDetailReportComponent,
    StudentCreateReportComponent,
    StudentPlanningComponent,
    TeacherDashboardComponent,
    TeacherPlanningComponent,
    TeacherProfileComponent,
    AdminDashboardComponent,
    TeacherFormationComponent,
    AdminReportsComponent,
    AdminFormationsComponent,
    AdminTeachersComponent,
    AdminStudentsComponent,
    AdminSkillsComponent,
    AdminFormationComponent,
    TeacherModuleComponent,
    TeacherStudentComponent,
    AdminFormationStudentComponent,
    AdminAdminsComponent,
    AdminFormationTeacherComponent,
    AdminPlanningsComponent,
    TeacherProfileComponent,
<<<<<<< HEAD
    TeacherPlanningComponent
=======
    AdminProfileComponent,
    AdminProfileStudentComponent,
    AdminProfileTeacherComponent,
    AdminProfileAdminComponent,
    TeacherPlanningComponent,
    AdminStudentModuleComponent,
    TeacherReportsComponent
>>>>>>> 55c8873aeba95fac0da0d7b388a4bfb7752b6cb0
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RoundProgressModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    ChartjsModule,
    AtomSpinnerModule,
    PdfViewerModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
  ],
  providers: [ApiService, { provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})

export class AppModule { }
