import { Component } from '@angular/core';
import { AppService } from './../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { IUser } from 'src/mapping/IUser';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './app-login-page.component.html',
    styleUrls: ['./app-login-page.component.sass']
})
export class AppLoginPageComponent {
    loggingIn = false;
    rememberUsername: string;
    username = '';
    password = '';

    constructor(
        private authenticationService: AuthenticationService,
        private httpService: AppService,
        private router: Router,
        private notificationService: MatSnackBar
    ) { }

    login() {
        if (!this.username || !this.password) {
            this.notificationService.open(`Gebruikersnaam en wachtwoord moeten ingevuld zijn.`, null, {
                panelClass: 'error-snack',
                duration: 2500
            });
            return;
        }

        this.loggingIn = true;

        const user: IUser = {
            Username: this.username,
            Password: this.password,
            Name: null,
            DateOfBirth: null,
            Email: null,
            RecoveryAnswer: null,
            RecoveryId: null,
            Id: null,
            Cookie: null
        };

        setTimeout(() => {
            this.httpService.loginUser(user).subscribe(
                (res) => {
                    this.authenticationService.setCurrentUser(res.body);
                    this.loggingIn = false;
                },
                (err) => {
                    this.notificationService.open(`${err.error.Message}`, null, {
                        panelClass: 'error-snack',
                        duration: 2500
                    });
                    this.loggingIn = false;
                });
        }, 1000);
    }

    onUsernameChange(username: string): void {
        this.username = username;
    }

    onPasswordChange(password: string): void {
        this.password = password;
    }

    hasError(error: string): boolean {
        return error ? true : false;
    }

    onRegister(): void {
        this.router.navigateByUrl('/register');
    }

    onToProfile(): void {
        this.router.navigateByUrl('/profile');
    }
}
