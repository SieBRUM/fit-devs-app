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

    getUsername() {
        return this.AuthenticationService.getCurrentUserCookie().Name;
    }

    navigate(route: string) {
        this.router.navigateByUrl(route);
    }

    getClass(route: string) {
        if (this.router.url == route) {
            return "btn my-2 my-sm-0 menu-bar-item selected"
        } else {
            return "btn my-2 my-sm-0 menu-bar-item"
        }
    }
}
