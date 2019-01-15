import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { IProfile } from 'src/mapping/IProfile';
import { IRecoveryQuestion } from 'src/mapping/IRecoveryQuestion';
import { AppService } from '../app.service';
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
        private notificationService: MatSnackBar,
        private authenticationService: AuthenticationService,
        public dialogRef: MatDialogRef<AppEditProfileDialogComponent>,
    ) {
        this.profile = data.profile;
        this.questions = data.questions;
        this.selectedQuestionText = this.questions.filter(x => x.Id === this.profile.User.RecoveryId)[0].RecoveryQuestion;
    }

    newDate(event: MatDatepickerInputEvent<Date>) {
        this.profile.User.DateOfBirth = event.value;
    }

    onSaveUser(): void {
        this.isLoading = true;
        if (this.newPassword !== this.newPasswordRepeat) {
            this.notificationService.open(`Wachtwoorden komen niet overeen!`, null, {
                panelClass: 'error-snack',
                duration: 2500
            });
            return;
        }
        if (!this.profile.User.Name) {
            this.notificationService.open(`Naam komen niet overeen!`, null, {
                panelClass: 'error-snack',
                duration: 2500
            }); return;
        }
        if (!this.profile.User.Username) {
            this.notificationService.open(`Gebruikersnaam komen niet overeen!`, null, {
                panelClass: 'error-snack',
                duration: 2500
            }); return;
        }
        if (!this.profile.User.DateOfBirth) {
            this.notificationService.open(`Geboortedatum komen niet overeen!`, null, {
                panelClass: 'error-snack',
                duration: 2500
            }); return;
        }
        if (!this.profile.Weigth) {
            this.notificationService.open(`Gewicht komen niet overeen!`, null, {
                panelClass: 'error-snack',
                duration: 2500
            }); return;
        }
        if (!this.profile.Length) {
            this.notificationService.open(`Lengte komen niet overeen!`, null, {
                panelClass: 'error-snack',
                duration: 2500
            }); return;
        }

        if (this.profile.User.RecoveryAnswer === "") {
            this.profile.User.RecoveryAnswer = null;
        }
        setTimeout(() => {
            this.appService.editUser(this.profile).subscribe(
                (resp) => {
                    this.isLoading = false;
                    this.notificationService.open(`Profiel succesvol opgeslagen!`, null, {
                        panelClass: 'success-snack',
                        duration: 2500
                    });
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
                        this.notificationService.open(`Er is iets mis gegaan! ${err.error.Message}`, null, {
                            panelClass: 'error-snack',
                            duration: 2500
                        });
                    }
                }
            );

        }, 1000);
    }
}
