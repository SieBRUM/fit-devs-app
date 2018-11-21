import { Component } from '@angular/core';
import { AppService } from './../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu-bar',
    templateUrl: './app-menu-bar.component.html',
    styleUrls: ['./app-menu-bar.component.sass']
})
export class AppMenuBarComponent {

    constructor(
        private AuthenticationService: AuthenticationService,
        private HttpService: AppService,
        private router: Router
    ) { }

    login() {
        this.router.navigateByUrl('/login');
    }

    logout() {
        this.AuthenticationService.logout();
    }
}
