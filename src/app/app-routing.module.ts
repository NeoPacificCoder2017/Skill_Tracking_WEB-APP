import { NgModule } from '@angular/core';
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test/test.component';


const routes: Routes = [
  {path: 'test', component: TestComponent}
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);