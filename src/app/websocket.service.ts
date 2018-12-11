import { Injectable, OnInit } from '@angular/core';
import { ICookieUser } from 'src/mapping/ICookieUser';
import { MatSnackBar } from '@angular/material';
import { AppService } from './app.service';

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private readonly CONNECTION_LINK: string = 'http://localhost:8080/backend/signalr';
    private connection: any;
    private hub: any;

    constructor(
        private snack: MatSnackBar,
        private appService: AppService
    ) {
        this._declareEventListeners();
    }

    configureWebsocket(): void {
        if (this.connection != null && this.connection !== undefined) {
            console.log('Called configureWebsocket when its already configured.');
            return;
        }

        const that = this;

        this.connection = $.hubConnection(this.CONNECTION_LINK, { useDefaultPath: false });
        this.hub = this.connection.createHubProxy('mainHub');

        this.connection.start()
            .done(function () {
                console.log('Now connected, connection ID=' + that.connection.id);
                console.log(that.connection);
                that.onSetNewCookie();
            })
            .fail(function () { console.log('Could not connect'); });

        this.hub.on('onReceiveFriendRequest', (newFriendName: string) => {
            const event = new CustomEvent('triggerNewFriend', { 'detail': newFriendName });
            document.dispatchEvent(event);
        });

        this.hub.on('newNotification', (data: any) => {
            const event = new CustomEvent('triggerNewFriend', { 'detail': data });
            document.dispatchEvent(event);
        });
    }


    onAddFriend(userId: number): void {
        const that = this;
        this.hub.invoke('AddFriend', this.getCurrentUserCookie().Cookie, userId).done(function () {
            console.log('Addfriend gelukt' + that.getCurrentUserCookie().Cookie + 'USER: ' + userId);
        }).fail(function (error) { console.log(error); });
    }

    onNotification(newName): void {
        this.snack.open(`Nieuw vriendverzoek van '${newName}'!`, 'Yay!', {
            duration: 6000,
            panelClass: 'friend-request-snack',
            horizontalPosition: 'end'
        });
    }

    onSetNotifications(data: any): void {
        this.appService.notifications = data;
    }

    onSetNewCookie(): void {
        if (this.getCurrentUserCookie() == null) {
            return;
        }

        this.hub.invoke('OnStartConnection', this.getCurrentUserCookie().Cookie).done(function () {
            console.log('Invocation of NewContosoChatMessage succeeded');
        }).fail(function (error) {
            console.log('Invocation of NewContosoChatMessage failed. Error: ' + error);
        });
    }

    getCurrentUserCookie(): ICookieUser {
        if (localStorage.getItem('user-cookie')) {
            return JSON.parse(localStorage.getItem('user-cookie'));
        } else {
            return null;
        }
    }

    // Quite a shame, but due to having issues with Sockets and triggering this particular service
    // We have to use custom events. All events will be documented in the constructor
    // of this service.
    private _declareEventListeners(): void {
        const that = this;

        document.addEventListener('triggerNewFriend', function (e: any) {
            that.onNotification(e.detail);
        });

        document.addEventListener('newNotification', function (e: any) {
            that.onSetNotifications(e.detail);
        });
    }
}
