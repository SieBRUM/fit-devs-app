import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { IProfile } from 'src/mapping/IProfile';
import { SnackBarService } from 'ng7-snack-bar';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';

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
        private notificationService: SnackBarService
    ) {
        this.isLoading = true;
        setTimeout(() => {
            this.appService.getProfile().subscribe(
                (resp) => {
                    this.isLoading = false;
                    this.profile = resp.body;
                },
                (err) => {
                    if (err.status == 401) {
                        this.authenticationService.logout("/profile");
                    } else {
                        this.notificationService.error("Er is iets mis gegaan", `${err.error.Message}`);
                    }
                    this.isLoading = false;
                });
        }, 1000);
    }

    getUser(): string {
        return this.authenticationService.getCurrentUserCookie().Name;
    }

    toReadableDate(date: string): string {
        if (!date) {
            return "";
        }
        date = date.substring(0, date.length - 9); // "12345.0"

        var newDate = new Date(date);
        return `${newDate.getUTCDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`
    }

    getPercentage(achievement: IAchievementStatus): string {
        if (!achievement) {
            return "";
        }

        return `${Math.round((achievement.CurrentPoints / achievement.Achievement.RequiredPoints) * 100)}`;
    }
} 
