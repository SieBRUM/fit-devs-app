import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { IProfile } from 'src/mapping/IProfile';
import { SnackBarService } from 'ng7-snack-bar';

@Component({
    selector: 'app-profile',
    templateUrl: './app-profile-page.component.html',
    styleUrls: ['./app-profile-page.component.sass']
})
export class AppProfilePageComponent {
    profile: IProfile = null;
    isLoading: boolean = false;

    constructor(
        private authenticationService: AuthenticationService,
        private appService: AppService,
        private router: Router,
        private notificationService: SnackBarService
    ) {
        this.appService.getProfile().subscribe(
            (resp) => {
                this.isLoading = false;
                this.profile = resp.body;
            },
            (err) => {
                if (err.status == 401) {
                    this.authenticationService.logout("/profile");
                } else {
                    notificationService.error("Er is iets mis gegaan", `${err.error.Message}`);
                }
                this.isLoading = false;
            }
        );
    }

    getUser(): string {
        return this.authenticationService.getCurrentUserCookie().Name;
    }

    textToJson(profile: IProfile): string {
        return JSON.stringify(this.profile, null, "\t");
    }
}
