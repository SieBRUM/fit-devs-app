import { Injectable } from '@angular/core';
import { IProfile } from 'src/mapping/IProfile';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUser: IProfile;

    constructor(
        private router: Router
    ) {
        if (localStorage.getItem('user')) {
            this.currentUser = JSON.parse(localStorage.getItem('user'));
        } else {
            this.currentUser = null;
        }
    }

    getCurrentUser(): IProfile {
        return this.currentUser;
    }

    getAuthorizationToken(): string {
        return "1337-420-lmao-kek"
    }

    setCurrentUser(newUser: IProfile): void {
        this.currentUser = newUser;
        localStorage.setItem('user', JSON.stringify(newUser));
    }

    logout() {
        localStorage.removeItem('user');
        this.currentUser = null;
        this.router.navigateByUrl('/login');
    }

    isLoggedIn(): boolean {
        return this.currentUser ? true : false;
    }
}