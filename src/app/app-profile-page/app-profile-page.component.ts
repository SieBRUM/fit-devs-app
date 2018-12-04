import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { IProfile } from 'src/mapping/IProfile';
import { SnackBarService } from 'ng7-snack-bar';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';
import { IRecoveryQuestion } from 'src/mapping/IRecoveryQuestion';

@Component({
    selector: 'app-profile',
    templateUrl: './app-profile-page.component.html',
    styleUrls: ['./app-profile-page.component.sass']
})
export class AppProfilePageComponent {
    profile: IProfile = null;
    isLoading = false;
    isSavingChanges = false;
    canEdit = false;
    isInEdit = false;
    isLoadingQuestions = false;
    incompletedAchievements: Array<IAchievementStatus> = [];
    completedAchievements: Array<IAchievementStatus> = [];
    questions: Array<IRecoveryQuestion> = [];
    selectedQuestion: number = null;

    // Edit data
    newName: string = null;
    newUsername: string = null;
    newPassword: string = null;
    newEmail: string = null;
    newLength: number = null;
    newWeigth: number = null;
    newRecoveryAnswer = '';
    newRecoveryQuestion: number = null;
    newDate: Date = null;

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
                    this.profile.Achievements.forEach(element => {
                        if (element.CurrentPoints >= element.Achievement.RequiredPoints) {
                            this.completedAchievements.push(element);
                        } else {
                            this.incompletedAchievements.push(element);
                        }
                    });
                    this.profile.User.DateOfBirth = new Date(Date.parse(this.profile.User.DateOfBirth.toString()));
                    this.canEdit = true;
                    this.setNewData(this.profile);
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

    toReadableDate(date: string): string {
        if (!date) {
            return '';
        }
        date = date.substring(0, date.length - 9);

        const newDate = new Date(date);
        return `${newDate.getUTCDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
    }

    getPercentage(achievement: IAchievementStatus): string {
        if (!achievement) {
            return '';
        }

        return `${Math.round((achievement.CurrentPoints / achievement.Achievement.RequiredPoints) * 100)}`;
    }

    onEnableEdit(): void {
        if (this.canEdit) {
            this.setNewData(this.profile);
            this.isInEdit = true;
            this.isLoadingQuestions = true;
            this.appService.getRecoveryQuestions().subscribe(
                (resp) => {
                    this.questions = resp.body;
                    this.isLoadingQuestions = false;
                },
                (err) => {
                    this.isLoadingQuestions = false;
                });
        }
    }

    onSaveEdit(): void {
        // do some saving
        if (!this.canEdit) {
            return;
        }
        this.isSavingChanges = true;

        setTimeout(() => {
            // Deepclone
            const newUser: IProfile = JSON.parse(JSON.stringify(this.profile));

            newUser.User.Name = this.newName;
            newUser.User.Email = this.newEmail;
            newUser.Length = this.newLength;
            newUser.Weigth = this.newWeigth;
            newUser.User.Password = this.newPassword;
            newUser.User.Username = this.newUsername;
            newUser.User.RecoveryAnswer = this.newRecoveryAnswer;
            newUser.User.RecoveryId = this.newRecoveryQuestion;
            newUser.User.DateOfBirth = this.newDate;

            this.appService.editUser(newUser).subscribe(
                (resp) => {
                    this.isSavingChanges = false;
                    this.isInEdit = false;
                    this.notificationService.success('Profiel succesvol opgeslagen!', null);
                    this.profile = resp.body;
                    this.setNewData(this.profile);
                    const cookie = this.authenticationService.getCurrentUserCookie();
                    cookie.Name = this.profile.User.Name;
                    this.authenticationService.setCurrentUser(cookie, false);
                },
                (err) => {
                    this.isSavingChanges = false;

                    if (err.status === 401) {
                        this.authenticationService.logout('/profile');
                    } else {
                        this.notificationService.error('Error met het opslaan van je profiel!', err.error.Message);
                    }
                }
            );

        }, 1000);
    }

    setNewData(profile: IProfile): void {
        this.newName = profile.User.Name;
        this.newEmail = profile.User.Email;
        this.newLength = profile.Length;
        this.newWeigth = profile.Weigth;
        this.newPassword = null;
        this.newUsername = profile.User.Username;
        this.newRecoveryAnswer = profile.User.RecoveryAnswer;
        this.newRecoveryQuestion = profile.User.RecoveryId;
        this.newDate = profile.User.DateOfBirth;
    }
}
