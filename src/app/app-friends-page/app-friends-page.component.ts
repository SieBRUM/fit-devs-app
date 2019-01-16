import { Component, Input, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { IProfile } from 'src/mapping/IProfile';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { IUserFlat } from 'src/mapping/IUserFlat';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';
import { AchievementService } from '../achievement.service';

@Component({
    selector: 'app-friends',
    templateUrl: './app-friends-page.component.html',
    styleUrls: ['./app-friends-page.component.sass']
})
export class AppFriendsPageComponent {
    @Input() profile: IProfile;
    @Input() completedAchievements: Array<IAchievementStatus>;
    @Input() incompletedAchievements: Array<IAchievementStatus>;

    isLoading = false;
    canEdit = false;
    isInEdit = false;
    currentTab = 'vrienden';
    private _friends: Array<IUserFlat>;

    constructor(
        private notificationService: MatSnackBar,
        private appService: AppService,
        private authenticationService: AuthenticationService,
        private achievementService: AchievementService
    ) { }


    @Input()
    set friends(friends: Array<IUserFlat>) {
        this._friends = friends;
        const list = [];
        friends.forEach(element => {
            list.push(element.Name);
        });
    }
    get friends(): Array<IUserFlat> {
        return this._friends;
    }

    onRemoveUser(user: IUserFlat): void {
        this.appService.removeFriend(user.Id).subscribe(
            (resp) => {
                this.notificationService.open(`Vriend '${user.Username}' verwijderd!`, null, {
                    panelClass: 'success-snack',
                    duration: 2500
                });
            },
            (err) => {
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
    }

    getCompletedAchievements(friend: IUserFlat): Array<IAchievementStatus> {
        const friendProfile = this._friends.filter(x => x.Id === friend.Id)[0];
        if (!friendProfile || !friendProfile.CompletedAchievements) {
            return [];
        }

        const completedAchievements: Array<IAchievementStatus> = [];
        friendProfile.CompletedAchievements.forEach(element => {
            if (element.CurrentPoints >= element.Achievement.RequiredPoints) {
                completedAchievements.push(element);
            }
        });

        return completedAchievements;
    }

    shouldShowDevider(friend: IUserFlat): boolean {
        if (friend.CompletedAchievements === null || friend.CompletedAchievements === null) {
            return false;
        }
        if (friend.CompletedAchievements === [] || Object.keys(friend.CompletedAchievements).length === 0) {
            return false;
        }

        return true;
    }

    shouldShowAchievement(achievement: IAchievementStatus, friend: IUserFlat): boolean {
        if (achievement.CurrentPoints >= achievement.Achievement.RequiredPoints) {
            if (
                friend.CompletedAchievements.find(x => x.Achievement.Tier < achievement.Achievement.Tier
                    && x.Achievement.Name === achievement.Achievement.Name)
            ) {
                return true;
            }
        }

        return false;
    }

}
