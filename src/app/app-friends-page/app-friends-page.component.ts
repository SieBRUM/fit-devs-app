import { Component, Input, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { IProfile } from 'src/mapping/IProfile';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { IUserFlat } from 'src/mapping/IUserFlat';
import { IAchievementStatus } from 'src/mapping/IAchievementStatus';

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
    private friendTableData: MatTableDataSource<IUserFlat>;

    constructor(
        private notificationService: MatSnackBar,
        private appService: AppService,
        private authenticationService: AuthenticationService
    ) { }


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
    getPlaatje(achievement: IAchievementStatus): string {
        let image = '';
        // Catogorie
        if (achievement.Achievement.Name.indexOf('Atletiek') > -1) {
            image += 'Atletiek/BadgeAtletiek';
        } else if (achievement.Achievement.Name.indexOf('Badminton') > -1) {
            image += 'Badminton/Badminton';
        } else if (achievement.Achievement.Name.indexOf('Basketball') > -1) {
            image += 'Basketball/BadgeBasketball';
        } else if (achievement.Achievement.Name.indexOf('Fitness') > -1) {
            image += 'Fitness/BadgeFitness';
        } else if (achievement.Achievement.Name.indexOf('Football') > -1) {
            image += 'Football/BadgeFootball';
        } else if (achievement.Achievement.Name.indexOf('Handbal') > -1) {
            image += 'Handbal/BadgeHandbal';
        } else if (achievement.Achievement.Name.indexOf('Hardlopen') > -1) {
            image += 'Hardlopen/Hardlopen';
        } else if (achievement.Achievement.Name.indexOf('Hockey') > -1) {
            image += 'Hockey/BadgeHockey';
        } else if (achievement.Achievement.Name.indexOf('Honkbal') > -1) {
            image += 'Honkbal/Honkball';
        } else if (achievement.Achievement.Name.indexOf('PingPong') > -1) {
            image += 'PingPong/BadgePingPong';
        } else if (achievement.Achievement.Name.indexOf('Soccer') > -1) {
            image += 'Soccer/BadgeSoccer';
        } else if (achievement.Achievement.Name.indexOf('Tennis') > -1) {
            image += 'Tennis/BadgeTennis';
        } else if (achievement.Achievement.Name.indexOf('Vechtsport') > -1) {
            image += 'Vechtsport/Vechtsport';
        } else if (achievement.Achievement.Name.indexOf('Wielrennen') > -1) {
            image += 'Wielrennen/Wielrennen';
        } else if (achievement.Achievement.Name.indexOf('Yoga') > -1) {
            image += 'Yoga/Yoga';
        } else if (achievement.Achievement.Name.indexOf('Zwemmen') > -1) {
            image += 'Zwemmen/BadgeZwemmen';
        } else {
            image += '';
        }
        // Tier
        if (achievement.Achievement.Tier === 5) {
            image += 'Zwart';
        } else if (achievement.Achievement.Tier === 4) {
            image += 'Rood';
        } else if (achievement.Achievement.Tier === 3) {
            image += 'Bronze';
        } else if (achievement.Achievement.Tier === 2) {
            image += 'Zilver';
        } else if (achievement.Achievement.Tier === 1) {
            image += 'Goud';
        } else {
            image += '';
        }
        return image;
    }
    getPercentage(achievement: IAchievementStatus): string {
        if (!achievement) {
            return '';
        }

        return `${Math.round((achievement.CurrentPoints / achievement.Achievement.RequiredPoints) * 100)}`;
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

    toReadableDate(date: string): string {
        if (!date) {
            return '';
        }
        date = date.substring(0, date.length - 9);

        const newDate = new Date(date);
        return `${newDate.getUTCDate()} -${newDate.getMonth() + 1} -${newDate.getFullYear()}`;
    }

    applyFilter(filterValue: string) {
        this.friendTableData.filter = filterValue.trim().toLowerCase();
    }

    shouldShowAchievement(achievement: IAchievementStatus): boolean {
        if (achievement.CurrentPoints >= achievement.Achievement.RequiredPoints) {
            if (
                this.completedAchievements.find(x => x.Achievement.Tier < achievement.Achievement.Tier
                    && x.Achievement.Name === achievement.Achievement.Name)
            ) {
                return true;
            }
        }

        return false;
    }

}
