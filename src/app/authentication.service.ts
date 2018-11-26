import { Injectable } from '@angular/core';
import { IProfile } from 'src/mapping/IProfile';
import { Router } from '@angular/router';
import { IUser } from 'src/mapping/IUser';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUser: IUser;

    constructor(
        private router: Router
    ) {
        if (localStorage.getItem('user')) {
            this.currentUser = JSON.parse(localStorage.getItem('user'));
        } else {
            this.currentUser = null;
        }
    }

    getCurrentUser(): IUser {
        return this.currentUser;
    }

    getAuthorizationToken(): string {
        return "1337-420-lmao-kek"
    }

    setCurrentUser(newUser: IUser): void {
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