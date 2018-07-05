import { NgModule } from '@angular/core';
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},

  //ROUTES STUDENT
  { path: 'student/dashboard', component: StudentDashboardComponent},

  //ROUTES TEACHER
  { path: 'teacher/dashboard', component: TeacherDashboardComponent},

  //ROUTES ADMIN
  { path: 'admin/dashboard', component: AdminDashboardComponent},

  //DEFAULT
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);