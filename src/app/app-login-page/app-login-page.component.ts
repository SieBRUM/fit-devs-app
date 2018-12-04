import { Component } from '@angular/core';
import { AppService } from './../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { IUser } from 'src/mapping/IUser';

@Component({
    selector: 'app-login',
    templateUrl: './app-login-page.component.html',
    styleUrls: ['./app-login-page.component.sass']
})
export class AppLoginPageComponent {
    loggingIn = false;
    rememberUsername: string;
    error = '';
    username: string;
    password: string;

    constructor(
        private authenticationService: AuthenticationService,
        private httpService: AppService,
        private router: Router
    ) { }

    login() {
        if (!this.username || !this.password) {
            this.error = 'Gebruikersnaam en wachtwoord moeten ingevuld zijn.';
            return;
        }

        this.loggingIn = true;
        this.error = '';

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
                    this.error = err.error.Message;
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

    onClearError(): void {
        this.error = '';
    }

    hasError(error: string): boolean {
        return error ? true : false;
    }

    onRegister(): void {
        this.router.navigateByUrl('/register');
    }
}
