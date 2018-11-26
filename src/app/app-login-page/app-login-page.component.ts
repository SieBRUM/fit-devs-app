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
    loggingIn: boolean = false;
    rememberUsername: string;
    error: string = "";
    username: string;
    password: string;

    constructor(
        private authenticationService: AuthenticationService,
        private httpService: AppService,
        private router: Router
    ) { }

    login() {
        if (!this.username || !this.password) {
            this.error = "Gebruikersnaam en wachtwoord moeten ingevuld zijn."
            return;
        }

        this.loggingIn = true;
        this.error = "";

        var user: IUser = {
            Username: this.username,
            Password: this.password,
            Name: null,
            DateOfBirth: null,
            Email: null,
            RecoveryAnswer: null,
            RecoveryId: null,
            Id: null
        };

        this.httpService.loginUser(user).subscribe(
            (res) => {
                this.authenticationService.setCurrentUser(res.body.User);
                this.router.navigateByUrl('/');
            },
            (err) => {
                this.error = err.error.Message;
            },
            () => {
                this.loggingIn = false;
            });
    }

    onUsernameChange(username: string) {
        this.username = username;
    }

    onPasswordChange(password: string) {
        this.password = password;
    }

    onClearError() {
        this.error = "";
    }

    hasError(error: string) {
        return error ? true : false;
    }

    onRegister() {
        this.router.navigateByUrl('/register');
    }
}
