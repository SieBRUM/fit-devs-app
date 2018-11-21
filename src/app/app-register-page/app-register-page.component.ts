import { Component } from '@angular/core';
import { AppService } from './../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

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

    constructor(
        private authenticationService: AuthenticationService,
        private httpService: AppService,
        private router: Router
    ) { }

    onRegister() {

    }

    onCancel() {
        this.router.navigateByUrl('/login');
    }

}
