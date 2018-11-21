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
import { HttpClientModule } from '@angular/common/http';
import { AppService } from './app.service';
import { AppMenuBarComponent } from './app-menu-bar/app-menu-bar.component';
import { AuthenticationService } from './authentication.service';
import { AppLoginPageComponent } from './app-login-page/app-login-page.component';
import { AppRegisterPageComponent } from './app-register-page/app-register-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuBarComponent,
    AppLoginPageComponent,
    AppRegisterPageComponent
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
      }
    }),
    StoreModule.forRoot([])
  ],
  providers: [
    AppService,
    AuthenticationService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
