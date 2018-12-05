import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { IUserFlat, FriendRequestStatus } from 'src/mapping/IUserFlat';
import { IUser } from 'src/mapping/IUser';
import { SnackBarService } from 'ng7-snack-bar';
import { IProfile } from 'src/mapping/IProfile';
import { WebsocketService } from '../websocket.service';

@Component({
    selector: 'app-search',
    templateUrl: './app-search-page.component.html',
    styleUrls: ['./app-search-page.component.sass']
})
export class AppSearchPageComponent {
    searchQuery: '';
    receivedData: Array<IUserFlat> = [];
    isLoading = false;

    constructor(
        private authenticationService: AuthenticationService,
        private appService: AppService,
        private activatedRoute: ActivatedRoute,
        private notificationService: SnackBarService,
        private webSocketService: WebsocketService
    ) {
        this.activatedRoute.queryParams.subscribe(
            (resp) => {
                this.searchQuery = resp['query'];
                this.onSearch();
            }
        );

    }

    onSearch(): void {
        if (!this.searchQuery) {
            return;
        }

        this.isLoading = true;
        setTimeout(() => {
            this.appService.getUsersByUsername(this.searchQuery).subscribe(
                (resp) => {
                    this.isLoading = false;
                    resp.body.forEach(element => {
                        element.DateOfBirth = this.toReadableDate(element.DateOfBirth.toString()) as unknown as Date;
                    });
                    this.receivedData = resp.body;
                },
                (err) => {
                    if (err.status === 401) {
                        this.authenticationService.logout('/profile');
                    } else {
                        this.notificationService.error('Er is iets mis gegaan', `${err.error.Message}`);
                    }
                    this.isLoading = false;
                }
            );
        }, 1000);
    }


    toReadableDate(date: string): string {
        if (!date) {
            return '';
        }
        date = date.substring(0, date.length - 9);

        const newDate = new Date(date);
        return `${newDate.getUTCDate()}-${newDate.getMonth() + 1}-${newDate.getFullYear()}`;
    }

    hasResults(data: Array<IUserFlat>) {
        return data.length > 0 ? true : false;
    }

    getButtonIcon(user: IUserFlat): string {
        switch (user.HasRequestOpen) {
            case FriendRequestStatus.HasSend:
                return 'alarm-clock';
            case FriendRequestStatus.HasReceived:
                return 'check';
            case FriendRequestStatus.AreFriends:
                return 'minus';
            default:
                return 'plus';
        }
    }

    shouldShowPrimary(user: IUserFlat): boolean {
        switch (user.HasRequestOpen) {
            case FriendRequestStatus.HasSend:
                return false;
            case FriendRequestStatus.HasReceived:
                return true;
            case FriendRequestStatus.AreFriends:
                return false;
            default:
                return true;
        }
    }

    shouldShowDanger(user: IUserFlat): boolean {
        switch (user.HasRequestOpen) {
            case FriendRequestStatus.HasSend:
            case FriendRequestStatus.HasReceived:
                return false;
            case FriendRequestStatus.AreFriends:
                return true;
            default:
                return false;
        }
    }


    shouldShowText(user: IUserFlat): boolean {
        switch (user.HasRequestOpen) {
            case FriendRequestStatus.HasSend:
                return true;
            case FriendRequestStatus.HasReceived:
            case FriendRequestStatus.AreFriends:
            default:
                return false;
        }
    }

    enumToReadable(user: IUserFlat): string {
        switch (user.HasRequestOpen) {
            case FriendRequestStatus.HasSend:
                return 'Vriendverzoek in aanvraag';
            case FriendRequestStatus.HasReceived:
                return 'Accepteer vriendverzoek';
            case FriendRequestStatus.AreFriends:
                return 'Verwijder als vriend';
            default:
                return 'Toevoegen';
        }
    }

    onUserAdd(user: IUserFlat): void {
        const profile: IProfile = {
            Id: user.Id,
            IsLazy: false,
            Length: null,
            Location: null,
            User: null,
            LocationId: null,
            UserId: null,
            Weigth: null
        };

        this.appService.addFriend(profile).subscribe(
            (resp) => {
                this.notificationService.success('Gebruiker toegevoegd!', `Gebruiker '${user.Username}' toegevoegd!`);
                this.webSocketService.onAddFriend(user.Id);
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

    onRemoveUser(user: IUserFlat): void {
        // Do some removing user :) !!
    }
}
