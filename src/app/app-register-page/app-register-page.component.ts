import { Component } from '@angular/core';
import { AppService } from './../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { IProfile } from 'src/mapping/IProfile';

@Component({
    selector: 'app-register',
    templateUrl: './app-register-page.component.html',
    styleUrls: ['./app-register-page.component.sass']
})
export class AppRegisterPageComponent {
    username: string;
    password: string;
    passwordRepeat: string;
    name: string;
    email: string;
    date: Date;
    length: number;
    weigth: number;
    error: string;

    constructor(
        private authenticationService: AuthenticationService,
        private httpService: AppService,
        private router: Router
    ) { }

    onRegister() {
        this.error = "";
        if (!this.username || !this.password || !this.passwordRepeat
            || !this.name || !this.email || !this.date
            || !this.length || !this.weigth) {
            this.error = "Alle velden zijn verplicht!";
            return;
        }

        if (this.password != this.passwordRepeat) {
            this.error = "Wachtwoorden komen niet overeen!";
            return;
        }

        let newUser: IProfile = {
            DateOfBirth: this.date,
            Email: this.email,
            Id: 0,
            IsLazy: false,
            Length: this.length,
            Location: {
                Id: 0,
                Latitude: this.httpService.getPosition().latitude,
                Longitude: this.httpService.getPosition().longitude,
            },
            LocationId: 0,
            Name: this.name,
            User: {
                Id: 0,
                Password: this.password,
                Username: this.username
            },
            UserId: 0,
            Weigth: this.weigth
        }

        this.httpService.registerUser(newUser).subscribe(
            (resp) => {
                this.authenticationService.setCurrentUser(resp.body);
            },
            (err) => {
                this.error = err.error.Message;
            });
    }

    onCancel(): void {
        this.router.navigateByUrl('/login');
    }

    onClearError() {
        this.error = "";
    }

    hasError(error): boolean {
        return error ? true : false;
    }
}
