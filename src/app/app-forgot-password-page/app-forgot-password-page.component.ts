import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { IProfile } from 'src/mapping/IProfile';
import { IUser } from 'src/mapping/IUser';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './app-forgot-password-page.component.html',
    styleUrls: ['./app-forgot-password-page.component.sass']
})
export class AppForgotPasswordPageComponent {
    isSuccess: boolean = false;
    isLoading: boolean = false;
    error: string = "";
    questions: Array<string> = [];
    email: string = null;
    recoveryQuestionAnswer: string = null;
    selectedQuestion: string = null;

    constructor(
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

    onCancel() {
        this.isSuccess = false;
        this.error = "";
        this.router.navigateByUrl('/login');
    }

    onRequestRecover() {
        let recoverUser: IUser = {
            Id: 0,
            Password: null,
            Username: null,
            Email: this.email,
            RecoveryId: 0,
            RecoveryAnswer: this.recoveryQuestionAnswer,
            Name: null,
            DateOfBirth: null
        }

        this.httpService.recoverUser(recoverUser).subscribe(
            (resp) => {
                this.isSuccess = true;
            },
            (err) => {
                this.isSuccess = true;
                this.error = err.error.Message;
            });
    }

    hasError(error): boolean {
        return error ? true : false;
    }
}
