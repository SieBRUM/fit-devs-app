import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLoginPageComponent } from './app-login-page/app-login-page.component';
import { AppRegisterPageComponent } from './app-register-page/app-register-page.component';
import { AuthGuard } from './auth.guard';
import { AppForgotPasswordPageComponent } from './app-forgot-password-page/app-forgot-password-page.component';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';
import { AppProfilePageComponent } from './app-profile-page/app-profile-page.component';
import { AppSearchPageComponent } from './app-search-page/app-search-page.component';

const routes: Routes = [
  { path: 'login', component: AppLoginPageComponent, canActivate: [AuthGuard] },
  { path: 'register', component: AppRegisterPageComponent, canActivate: [AuthGuard] },
  { path: 'recover', component: AppForgotPasswordPageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: AppProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'search', component: AppSearchPageComponent, canActivate: [AuthGuard] },
  { path: 'home', component: AppHomePageComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
