import { Injectable } from '@angular/core';
import { IProfile } from 'src/mapping/IProfile';
import { Router } from '@angular/router';

@Injectable()
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