import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLoginPageComponent } from './app-login-page/app-login-page.component';
import { AppRegisterPageComponent } from './app-register-page/app-register-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: AppLoginPageComponent, canActivate: [AuthGuard] },
  { path: 'register', component: AppRegisterPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
