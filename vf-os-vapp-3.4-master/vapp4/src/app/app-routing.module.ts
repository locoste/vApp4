import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren:  () => import('./login/login.module').then(mod => mod.LoginModule)
  },
  {
    path: 'home',
    loadChildren:  () => import('./home/home.module').then(mod => mod.HomeModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'controls',
    loadChildren:  () => import('./controls/controls.module').then(mod => mod.ControlsModule),
    canLoad: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
