import { Component, Input, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { IProfile } from 'src/mapping/IProfile';
import { IFriend } from 'src/mapping/IFriend';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FriendRequestStatus, IUserFlat } from 'src/mapping/IUserFlat';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';
import { element } from '@angular/core/src/render3';
import { SnackBarService } from 'ng7-snack-bar';



@Component({
    selector: 'app-friends',
    templateUrl: './app-friends-page.component.html',
    styleUrls: ['./app-friends-page.component.sass']
})
export class AppFriendsPageComponent {
    profile: IProfile = null;
    isLoading = false;
    canEdit = false;
    isInEdit = false;
    incompletedAchievements: Array<IAchievementStatus> = [];
    completedAchievements: Array<IAchievementStatus> = [];
    currentTab = 'vrienden';
    private _friends: Array<IUserFlat>;
    private friendTableData: MatTableDataSource<IUserFlat>;

    constructor(
        private notificationService: SnackBarService,
        private appService: AppService,
        private authenticationService: AuthenticationService
    ) {}


    @Input()
    set friends(friends: Array<IUserFlat>) {
        this._friends = friends;
        const list = [];
        friends.forEach(element => {
            list.push(element.Name);
        });
        this.friendTableData = new MatTableDataSource(list);
    }
    get friends(): Array<IUserFlat> {
        return this._friends;
    }

    onRemoveUser(user: IUserFlat): void {
        console.log(user);
        this.appService.removeFriend(user.Id).subscribe(
            (resp) => {

                this.notificationService.success('Vriend verwijderd!', `Vriend '${user.Username}' verwijderd!`);

            },
            (err) => {
                if (err.status === 401) {
                    this.authenticationService.logout('/profile');
                } else {
                    this.notificationService.error('Er is iets mis gegaan', `${err.error.Message}`);
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

    toReadableDate(date: string): string {
        if (!date) {
            return '';
        }
        date = date.substring(0, date.length - 9);

        const newDate = new Date(date);
        return `${newDate.getUTCDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
    }

    applyFilter(filterValue: string) {
        this.friendTableData.filter = filterValue.trim().toLowerCase();
    }
}
