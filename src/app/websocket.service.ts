import { Injectable, OnInit } from '@angular/core';
import { SnackBarService } from 'ng7-snack-bar';
import { AuthenticationService } from './authentication.service';
declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private readonly CONNECTION_LINK: string = 'http://localhost:8080/backend/signalr';
    private connection: any;
    private hub: any;

    constructor(
        private notificationService: SnackBarService,
        private authenticationService: AuthenticationService
    ) { }

    configureWebsocket(): void {
        if (this.connection != null && this.connection !== undefined) {
            console.log('Called configureWebsocket when its already configured.');
            return;
        }
        const that = this;

        this.connection = $.hubConnection(this.CONNECTION_LINK, { useDefaultPath: false });
        this.hub = this.connection.createHubProxy('mainHub');

        this.hub.on('addContosoChatMessageToPage', function (bla) {
            console.log('From backend:');
            console.log(bla);
        });

        this.hub.on('onReceiveFriendRequest', function (newFriendRuquestName) {
            console.log('hey' + newFriendRuquestName);
            that.onNotification(newFriendRuquestName);
        });


        this.connection.start()
            .done(function () {
                console.log('Now connected, connection ID=' + that.connection.id);
                console.log(that.connection);
                that.hub.invoke('OnStartConnection', that.authenticationService.getCurrentUserCookie().Cookie).done(function () {
                    console.log('Invocation of NewContosoChatMessage succeeded');
                }).fail(function (error) {
                    console.log('Invocation of NewContosoChatMessage failed. Error: ' + error);
                });
            })
            .fail(function () { console.log('Could not connect'); });
    }


    onAddFriend(userId: number): void {
        const that = this;
        this.hub.invoke('AddFriend', this.authenticationService.getCurrentUserCookie().Cookie, userId).done(function () {
            console.log('Addfriend gelukt' + that.authenticationService.getCurrentUserCookie().Cookie + 'USER: ' + userId);
        }).fail(function (error) { console.log(error); });
    }

    onNotification(newFriendRuquestName): void {
        console.log(newFriendRuquestName);
        console.log(this.notificationService);
        alert(`Gebruiker ${newFriendRuquestName} heeft een vriendenverzoek verstuurd naar je!`);
    }
}
