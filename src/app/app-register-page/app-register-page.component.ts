import { Component } from '@angular/core';
import { AppService } from './../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { IProfile } from 'src/mapping/IProfile';
import { IUser } from 'src/mapping/IUser';

@Component({
    selector: 'app-register',
    templateUrl: './app-register-page.component.html',
    styleUrls: ['./app-register-page.component.sass']
})
export class AppRegisterPageComponent {
    step: number = 1;
    username: string;
    password: string;
    passwordRepeat: string;
    name: string;
    email: string;
    date: Date;
    length: number;
    weigth: number;
    error: string;
    questions: Array<string> = [];
    recoveryQuestionAnswer: string = null;
    selectedQuestion: string = null;

    constructor(
        private authenticationService: AuthenticationService,
        private httpService: AppService,
        private router: Router
    ) {
        this.httpService.getRecoveryQuestions().subscribe(
            (resp) => {
                this.questions = resp.body;
            },
            (err) => {
                this.error = err.error.Message;
                this.questions = [
                    "Wat is je lievelings eten?",
                    "Wat was je eerste huisdier?",
                    "Wat is je moeders middelnaam?",
                    "Wat was je eerste school?",
                    "Wat is je geboorteplaats?",
                ];
            });
    }

    onRegisterUser() {
        this.error = "";
        if (!this.username || !this.password || !this.passwordRepeat
            || !this.name || !this.email || !this.date
            || !this.selectedQuestion || !this.recoveryQuestionAnswer) {
            this.error = "Alle velden zijn verplicht!";
            return;
        }

        if (this.password != this.passwordRepeat) {
            this.error = "Wachtwoorden komen niet overeen!";
            return;
        }

        this.step = 2;

        let newUser: IUser = {
            Id: 0,
            Password: this.password,
            Username: this.username,
            Name: this.name,
            DateOfBirth: this.date,
            Email: this.email,
            RecoveryAnswer: null,
            RecoveryId: null
        }

        this.httpService.registerUser(newUser).subscribe(
            (resp) => {
                this.authenticationService.setCurrentUser(resp.body);
            },
            (err) => {
                this.error = err.error.Message;
            });
    }

    onRegisterProfile() {
        if (!this.length || !this.weigth) {
            this.error = "Alle velden zijn verplicht!";
            return;
        }
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

    checkIfStep(step: number) {
        return step == this.step ? true : false;
    }
}
