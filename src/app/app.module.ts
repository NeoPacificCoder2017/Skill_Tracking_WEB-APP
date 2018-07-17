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

import { LoginComponent } from './login/login.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { TeacherFormationComponent } from './teacher/teacher-formation/teacher-formation.component';
import { AdminFormationsComponent } from './admin/admin-formations/admin-formations.component';
import { AdminTeachersComponent } from './admin/admin-teachers/admin-teachers.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';

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
    TeacherDashboardComponent,
    AdminDashboardComponent,
    TeacherFormationComponent,
    AdminDashboardComponent,
    AdminFormationsComponent,
    AdminTeachersComponent,
    AdminStudentsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RoundProgressModule
  ],
  providers: [ApiService, { provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
