import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { AtomSpinnerModule } from 'angular-epic-spinners';
import { ScalingSquaresSpinnerModule} from 'angular-epic-spinners';
import { LoginComponent } from './login/login.component';
/** STUDENT */
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { StudentReportComponent } from './student/student-report/student-report.component';
import { StudentDetailReportComponent } from './student/student-detail-report/student-detail-report.component';
import { StudentCreateReportComponent } from './student/student-create-report/student-create-report.component';
import { StudentPlanningComponent } from './student/student-planning/student-planning.component';
import { StudentEditReportComponent } from './student/student-edit-report/student-edit-report.component';

/** TEACHER */
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherFormationComponent } from './teacher/teacher-formation/teacher-formation.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { TeacherPlanningComponent } from './teacher/teacher-planning/teacher-planning.component';
import { TeacherModuleComponent } from './teacher/teacher-module/teacher-module.component';
import { TeacherStudentComponent } from './teacher/teacher-student/teacher-student.component';
import { TeacherReportsComponent } from './teacher/teacher-reports/teacher-reports.component';
import { TeacherReportDetailComponent } from './teacher/teacher-report-detail/teacher-report-detail.component';

/** ADMIN */
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminFormationsComponent } from './admin/admin-formations/admin-formations.component';
import { AdminModuleComponent } from './admin/admin-module/admin-module.component';
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
import { AdminReportDetailComponent } from './admin/admin-report-detail/admin-report-detail.component';
import { ResetPasswordComponent } from './password-reset/reset-password/reset-password.component';
import { ResetPasswordFormComponent } from './password-reset/reset-password-form/reset-password-form.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';

import { RequestInterceptor } from './services/api/request.interceptor';

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
    StudentEditReportComponent,

    TeacherDashboardComponent,
    TeacherPlanningComponent,
    TeacherProfileComponent,
    TeacherFormationComponent,
    TeacherModuleComponent,
    TeacherStudentComponent,
    TeacherProfileComponent,
    TeacherPlanningComponent,
    TeacherReportsComponent,
    TeacherReportDetailComponent,

    AdminDashboardComponent,
    AdminReportsComponent,
    AdminFormationsComponent,
    AdminTeachersComponent,
    AdminStudentsComponent,
    AdminSkillsComponent,
    AdminFormationComponent,
    AdminFormationStudentComponent,
    AdminAdminsComponent,
    AdminFormationTeacherComponent,
    AdminPlanningsComponent,
    AdminProfileComponent,
    AdminProfileStudentComponent,
    AdminProfileTeacherComponent,
    AdminProfileAdminComponent,
    AdminStudentModuleComponent,
    AdminReportDetailComponent,
    TeacherReportsComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent,
    AdminModuleComponent,
    AdminUsersComponent,
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
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    FilterPipeModule,
    ScalingSquaresSpinnerModule
  ],
  providers: [
    ApiService,
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
