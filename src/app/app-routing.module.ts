import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// LAYOUT
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';

// PAGES
import { LoginComponent } from './login/login.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent},
      { path: '', redirectTo: '/login', pathMatch: 'full' },
    ]
  },

  // ROUTES STUDENT
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      // ROUTES STUDENT
      { path: 'student/dashboard', component: StudentDashboardComponent},

      // ROUTES TEACHER
      { path: 'teacher/dashboard', component: TeacherDashboardComponent},

      // ROUTES ADMIN
      { path: 'admin/dashboard', component: AdminDashboardComponent},
    ]
  },

  // DEFAULT

];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
