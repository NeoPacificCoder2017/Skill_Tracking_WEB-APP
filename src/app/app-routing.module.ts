import { StudentReportComponent } from './student/student-report/student-report.component';
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
import { AdminFormationComponent } from './admin/admin-formation/admin-formation.component';
import { AdminTeachersComponent } from './admin/admin-teachers/admin-teachers.component';
import { AdminStudentsComponent } from './admin/admin-students/admin-students.component';
import { AdminSkillsComponent } from './admin/admin-skills/admin-skills.component';
import { AdminAdminsComponent } from './admin/admin-admins/admin-admins.component';
import { AdminPlanningsComponent } from './admin/admin-plannings/admin-plannings.component';
import { AdminReportsComponent } from './admin/admin-reports/admin-reports.component';
import { AdminProfileStudentComponent } from './admin/admin-profile-student/admin-profile-student.component';
import { AdminProfileTeacherComponent } from './admin/admin-profile-teacher/admin-profile-teacher.component';
import { AdminProfileAdminComponent } from './admin/admin-profile-admin/admin-profile-admin.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';

// PAGES TEACHER
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherFormationComponent } from './teacher/teacher-formation/teacher-formation.component';
import { TeacherStudentComponent } from './teacher/teacher-student/teacher-student.component';
import { TeacherProfileComponent } from './teacher/teacher-profile/teacher-profile.component';
import { TeacherPlanningComponent } from './teacher/teacher-planning/teacher-planning.component';

// PAGES STUDENT
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { AdminFormationStudentComponent } from './admin/admin-formation-student/admin-formation-student.component';

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
      { path: 'student/reports', component: StudentReportComponent},

      // ROUTES TEACHER
      { path: 'teacher/dashboard', component: TeacherDashboardComponent},
      { path: 'teacher/formation', component: TeacherFormationComponent},
      { path: 'teacher/student', component: TeacherStudentComponent},
      { path: 'teacher/profile', component: TeacherProfileComponent},
      { path: 'teacher/planning', component: TeacherPlanningComponent},

      // ROUTES ADMIN
      { path: 'admin/dashboard', component: AdminDashboardComponent},
      { path: 'admin/formations', component: AdminFormationsComponent},
      { path: 'admin/formation', component: AdminFormationComponent},
      { path: 'admin/formation/student', component: AdminFormationStudentComponent},
      { path: 'admin/admin', component: AdminAdminsComponent},
      { path: 'admin/teachers', component: AdminTeachersComponent},
      { path: 'admin/students', component: AdminStudentsComponent},
      { path: 'admin/skills', component: AdminSkillsComponent},
      { path: 'admin/plannings', component: AdminPlanningsComponent},
      { path: 'admin/reports', component: AdminReportsComponent},
      { path: 'admin/profileStudent', component: AdminProfileStudentComponent},
      { path: 'admin/profile', component: AdminProfileComponent},
      { path: 'admin/profileTeacher', component: AdminProfileTeacherComponent},
      { path: 'admin/profileAdmin', component: AdminProfileAdminComponent},
    ]
  },

  // DEFAULT

];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'});
