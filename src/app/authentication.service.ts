import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ICookieUser } from 'src/mapping/ICookieUser';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private userCookie: ICookieUser;
    public redirectUrl: string = "";

    constructor(
        private router: Router
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

    setCurrentUser(cookie: ICookieUser): void {
        this.userCookie = cookie;
        localStorage.setItem('user-cookie', JSON.stringify(cookie));

        if (this.redirectUrl) {
            this.router.navigateByUrl(this.redirectUrl);
        } else {
            this.router.navigateByUrl("/home");
        }
    }

    logout() {
        localStorage.removeItem('user-cookie');
        this.userCookie = null;
        this.router.navigateByUrl('/login');
    }

    isLoggedIn(): boolean {
        return this.userCookie ? true : false;
    }
}