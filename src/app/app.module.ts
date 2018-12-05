// Internal
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// External
import { AlertModule } from 'ngx-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SnackBarModule, SnackBarService, TemplateType } from 'ng7-snack-bar';
import { StoreModule } from '@ngrx/store';

// Personal
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppService } from './app.service';
import { AppMenuBarComponent } from './app-menu-bar/app-menu-bar.component';
import { AuthenticationService } from './authentication.service';
import { AppLoginPageComponent } from './app-login-page/app-login-page.component';
import { AppRegisterPageComponent } from './app-register-page/app-register-page.component';
import { FormsModule } from '@angular/forms';
import { AppInterceptor } from './app.interceptor';
import { AppForgotPasswordPageComponent } from './app-forgot-password-page/app-forgot-password-page.component';
import { AppHomePageComponent } from './app-home-page/app-home-page.component';
import { AppProfilePageComponent } from './app-profile-page/app-profile-page.component';
import { AppSearchPageComponent } from './app-search-page/app-search-page.component';
import { WebsocketService } from './websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuBarComponent,
    AppLoginPageComponent,
    AppRegisterPageComponent,
    AppForgotPasswordPageComponent,
    AppHomePageComponent,
    AppProfilePageComponent,
    AppSearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    AlertModule.forRoot(),
    SnackBarModule.forRoot({
      template: TemplateType.DARK,
      errorOptions: {
        closeTimeOut: 5000,
        isClose: true
      },
      successOptions: {
        closeTimeOut: 5000,
        isClose: true
      }
    }),
    StoreModule.forRoot([])
  ],
  providers: [
    AppService,
    AuthenticationService,
    WebsocketService,
    SnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
