import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ICookieUser } from 'src/mapping/ICookieUser';
import { WebsocketService } from './websocket.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private userCookie: ICookieUser;
    public redirectUrl = '';

    constructor(
        private router: Router,
        private websocketService: WebsocketService
    ) {
        if (localStorage.getItem('user-cookie')) {
            this.userCookie = JSON.parse(localStorage.getItem('user-cookie'));
        } else {
            this.userCookie = null;
        }

    }

    getCurrentUserCookie(): ICookieUser {
        return this.userCookie;
    }

    getAuthorizationToken(): string {
        if (!this.userCookie) {
            return null;
        }

        return this.userCookie.Cookie;
    }

    setCurrentUser(cookie: ICookieUser, navigate: boolean = true): void {
        this.userCookie = cookie;
        localStorage.setItem('user-cookie', JSON.stringify(cookie));

        if (!navigate) {
            return;
        }

        if (this.redirectUrl) {
            this.router.navigateByUrl(this.redirectUrl);
            this.redirectUrl = '';
        } else {
            this.router.navigateByUrl('/home');
        }

        this.websocketService.onSetNewCookie();
    }

    logout(url: string = '') {
        this.redirectUrl = url;
        localStorage.removeItem('user-cookie');
        this.userCookie = null;
        this.router.navigateByUrl('/login');
    }

    isLoggedIn(): boolean {
        return this.userCookie ? true : false;
    }
}
