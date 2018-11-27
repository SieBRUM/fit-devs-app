import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './app-profile-page.component.html',
    styleUrls: ['./app-profile-page.component.sass']
})
export class AppProfilePageComponent {
    constructor(
        private authenticationService: AuthenticationService,
        private appService: AppService,
        private router: Router
    ) { }


    getUser() {
        return this.authenticationService.getCurrentUserCookie().Name;
    }
}
