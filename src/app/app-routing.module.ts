import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLoginPageComponent } from './app-login-page/app-login-page.component';
import { AppRegisterPageComponent } from './app-register-page/app-register-page.component';

const routes: Routes = [
  { path: 'login', component: AppLoginPageComponent },
  { path: 'register', component: AppRegisterPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
