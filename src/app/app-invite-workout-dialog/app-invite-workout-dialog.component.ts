import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepickerInputEvent, MatSnackBar } from '@angular/material';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';
import { IProfile } from 'src/mapping/IProfile';
import { IActivity } from 'src/mapping/IActivity';

@Component({
    selector: 'app-invite-workout-dialog',
    templateUrl: 'app-invite-workout-dialog.component.html',
    styleUrls: ['app-invite-workout-dialog.component.sass']
})
export class AppInviteWorkoutDialogComponent {

    step = 0;
    isLoading = true;
    displayedColumns = ['Gebruikersnaam', 'Naam', 'Geslacht', 'Acties'];
    displayedColumnsActivities = ['Activiteitennaam', 'Acties'];
    closeUserList: Array<IProfile> = [];
    closeActivitiesList: Array<IActivity> = [];
    selectedUser: IProfile = null;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private appService: AppService,
        private notificationService: MatSnackBar,
        private authenticationService: AuthenticationService,
        public dialogRef: MatDialogRef<AppInviteWorkoutDialogComponent>,
    ) {
        setTimeout(() => {
            this.appService.getCloseUsers().subscribe(
                (resp) => {
                    this.closeUserList = resp.body;
                    this.isLoading = false;
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

    onInviteUser(user: IProfile): void {
        if (user === null) {
            this.notificationService.open('Je moet eerst een gebruiker kiezen!', null, {
                panelClass: 'error-snack',
                duration: 2500
            });
            return;
        }
        this.step = 1;
        this.selectedUser = user;
        this.isLoading = true;
        setTimeout(() => {
            this.appService.getCloseActivities().subscribe(
                (resp) => {
                    this.closeActivitiesList = resp.body;
                    this.isLoading = false;
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

    onSelectionChanged(event: any): void {
        if (this.selectedUser == null) {
            this.step = 0;
        }
    }
}
