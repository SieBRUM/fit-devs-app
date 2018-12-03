import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { IProfile } from 'src/mapping/IProfile';
import { SnackBarService } from 'ng7-snack-bar';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './app-edit-profile-page.component.html',
    styleUrls: ['./app-edit-profile-page.component.sass']
})
export class AppEditProfilePageComponent {
    private _profile: IProfile;
    @Input()
    set profile(profile: IProfile) {
        this._profile = profile;
        this.setNewData(profile);
    }

    isLoading: boolean = false;

    // Edit data
    newName: string = null;
    newUsername: string = null;
    newPassword: string = null;
    newEmail: string = null;
    newLength: number = null;
    newWeigth: number = null;

    constructor(
        private authenticationService: AuthenticationService,
        private appService: AppService,
        private notificationService: SnackBarService
    ) {
        this.isLoading = true;
    }

    setNewData(profile: IProfile): void {
        this.newName = profile.User.Name;
        this.newEmail = profile.User.Email;
        this.newLength = profile.Length;
        this.newWeigth = profile.Weigth;
        this.newPassword = null;
        this.newUsername = profile.User.Username;
    }
} 
