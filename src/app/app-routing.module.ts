import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// LAYOUT
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { AppLayoutComponent } from './_layout/app-layout/app-layout.component';

// PAGES
import { LoginComponent } from './login/login.component';

// PAGES ADMIN
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminFormationsComponent } from './admin/admin-formations/admin-formations.component';
import { AdminTeachersComponent } from './admin/admin-teachers/admin-teachers.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminModulesComponent } from './admin/admin-modules/admin-modules.component';
import { AdminCompetencesComponent } from './admin/admin-competences/admin-competences.component';

// PAGES TEACHER
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherFormationComponent } from './teacher/teacher-formation/teacher-formation.component';

// PAGES STUDENT
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';

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
      { path: 'teacher/formation', component: TeacherFormationComponent},

      // ROUTES ADMIN
      { path: 'admin/dashboard', component: AdminDashboardComponent},
      { path: 'admin/formations', component: AdminFormationsComponent},
      { path: 'admin/teachers', component: AdminTeachersComponent},
      { path: 'admin/students', component: AdminStudentsComponent},
      { path: 'admin/modules', component: AdminModulesComponent},
      { path: 'admin/competences', component: AdminCompetencesComponent},
    ]
  },

  // DEFAULT

];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
