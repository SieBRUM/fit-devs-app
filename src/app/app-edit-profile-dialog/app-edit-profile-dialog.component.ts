import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepickerInputEvent } from '@angular/material';
import { IProfile } from 'src/mapping/IProfile';
import { IRecoveryQuestion } from 'src/mapping/IRecoveryQuestion';
import { AppService } from '../app.service';
import { SnackBarService } from 'ng7-snack-bar';
import { AuthenticationService } from '../authentication.service';

@Component({
    selector: 'app-edit-profile-dialog',
    templateUrl: 'app-edit-profile-dialog.component.html',
    styleUrls: ['app-edit-profile-dialog.component.sass']
})
export class AppEditProfileDialogComponent {
    profile: IProfile;
    questions: Array<IRecoveryQuestion> = [];
    isLoading = false;
    selectedQuestion: number;
    selectedQuestionText: string;
    newPassword = '';
    newPasswordRepeat = '';

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private appService: AppService,
        private notificationService: SnackBarService,
        private authenticationService: AuthenticationService,
        public dialogRef: MatDialogRef<AppEditProfileDialogComponent>,
    ) {
        this.profile = data.profile;
        this.questions = data.questions;
        this.selectedQuestionText = this.questions.filter(x => x.Id === this.profile.User.RecoveryId)[0].RecoveryQuestion;
    }

    newDate(type: string, event: MatDatepickerInputEvent<Date>) {
        this.profile.User.DateOfBirth = event.value;
    }

    onSaveUser(): void {
        this.isLoading = true;
        if (this.newPassword !== this.newPasswordRepeat) {
            this.notificationService.error('Wachtwoorden komen niet overeen!', null);
            return;
        }
        if (!this.profile.User.Name) {
            this.notificationService.error('Naam is niet ingevuld!', null);
            return;
        }
        if (!this.profile.User.Username) {
            this.notificationService.error('Gebruikersnaam is niet ingevuld!', null);
            return;
        }
        if (!this.profile.User.DateOfBirth) {
            this.notificationService.error('Geboortedatum is niet ingevuld!', null);
            return;
        }
        if (!this.profile.Weigth) {
            this.notificationService.error('Gewicht is niet ingevuld!', null);
            return;
        }
        if (!this.profile.Length) {
            this.notificationService.error('Lengte is niet ingevuld!', null);
            return;
        }

        if (this.profile.User.RecoveryAnswer === "") {
            this.profile.User.RecoveryAnswer = null;
        }

        setTimeout(() => {
            this.appService.editUser(this.profile).subscribe(
                (resp) => {
                    this.isLoading = false;
                    this.notificationService.success('Profiel succesvol opgeslagen!', null);
                    this.profile = resp.body;
                    const cookie = this.authenticationService.getCurrentUserCookie();
                    cookie.Name = this.profile.User.Name;
                    this.authenticationService.setCurrentUser(cookie, false);
                    this.dialogRef.close(this.profile);
                },
                (err) => {
                    this.isLoading = false;
                    if (err.status === 401) {
                        this.authenticationService.logout('/profile');
                    } else {
                        this.notificationService.error('Error met het opslaan van je profiel!', err.error.Message);
                    }
                }
            );

        }, 1000);
    }
}
