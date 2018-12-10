import { Injectable, OnInit } from '@angular/core';
import { SnackBarService } from 'ng7-snack-bar';
import { ICookieUser } from 'src/mapping/ICookieUser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FriendRequestModalComponent } from './modals/friend-request-modal/friend-request-modal.component';
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
        private dialogService: MatDialog,
        private snack: MatSnackBar,
        private appService: AppService
    ) { }

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
            this.onNotification(newFriendName);
        });
    }


    onAddFriend(userId: number): void {
        const that = this;
        this.hub.invoke('AddFriend', this.getCurrentUserCookie().Cookie, userId).done(function () {
            console.log('Addfriend gelukt' + that.getCurrentUserCookie().Cookie + 'USER: ' + userId);
        }).fail(function (error) { console.log(error); });
    }

    onNotification(newName): void {
        // Lets add some fancy modules eh ?
        this.appService.saus(newName);
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
}
