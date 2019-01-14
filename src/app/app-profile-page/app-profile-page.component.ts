import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { IProfile } from 'src/mapping/IProfile';
import { SnackBarService } from 'ng7-snack-bar';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';
import { IRecoveryQuestion } from 'src/mapping/IRecoveryQuestion';
import { MatDialog } from '@angular/material';
import { AppEditProfileDialogComponent } from '../app-edit-profile-dialog/app-edit-profile-dialog.component';

@Component({
    selector: 'app-profile',
    templateUrl: './app-profile-page.component.html',
    styleUrls: ['./app-profile-page.component.sass']
})
export class AppProfilePageComponent {
    profile: IProfile = null;
    isLoading = false;
    isLoadingQuestions = false;
    incompletedAchievements: Array<IAchievementStatus> = [];
    completedAchievements: Array<IAchievementStatus> = [];
    questions: Array<IRecoveryQuestion> = [];
    profileSideOpened = true;
    currentTab = 'achievements';

    constructor(
        private authenticationService: AuthenticationService,
        private appService: AppService,
        private notificationService: SnackBarService,
        private dialog: MatDialog
    ) {
        this.isLoading = true;
        setTimeout(() => {
            this.appService.getProfile().subscribe(
                (resp) => {
                    this.isLoading = false;
                    this.profile = resp.body;
                    this.profile.Achievements.forEach(element => {
                        if (element.CurrentPoints >= element.Achievement.RequiredPoints) {
                            this.completedAchievements.push(element);
                        } else {
                            this.incompletedAchievements.push(element);
                        }
                    });
                    this.profile.User.DateOfBirth = new Date(Date.parse(this.profile.User.DateOfBirth.toString()));
                },
                (err) => {
                    if (err.status === 401) {
                        this.authenticationService.logout('/profile');
                    } else {
                        this.notificationService.error('Er is iets mis gegaan', `${err.error.Message}`);
                    }
                    this.isLoading = false;
                });
        }, 1000);
    }

    getUser(): string {
        return this.authenticationService.getCurrentUserCookie().Name;
    }

    onEnableEdit(): void {
        this.appService.getRecoveryQuestions().subscribe(
            (resp) => {
                this.questions = resp.body;
                this.isLoadingQuestions = false;
                const dialogRef = this.dialog.open(AppEditProfileDialogComponent, {
                    data: {
                        profile: this.returnNewProfile(this.profile),
                        questions: this.questions
                    },
                    disableClose: true,
                    width: '80vh'
                });

                dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                        this.profile = result;
                    }
                });
            },
            (err) => {
                this.isLoadingQuestions = false;
            });
    }

    returnNewProfile(profile: IProfile): IProfile {
        const newProfile: IProfile = {
            Id: profile.Id,
            Weigth: profile.Weigth,
            IsLazy: profile.IsLazy,
            Length: profile.Length,
            UserId: profile.UserId,
            Location: null,
            LocationId: null,
            User: {
                Id: profile.User.Id,
                DateOfBirth: profile.User.DateOfBirth,
                Email: profile.User.Email,
                Name: profile.User.Name,
                Username: profile.User.Username,
                RecoveryId: profile.User.RecoveryId,
                RecoveryAnswer: profile.User.RecoveryAnswer,
                Password: null,
                Cookie: null
            }
        };

        return newProfile;
    }

    openTab(tabName: string): void {
        this.currentTab = tabName;
    }
}
