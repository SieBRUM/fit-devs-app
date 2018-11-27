import { Component, ReflectiveInjector } from '@angular/core';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { IProfile } from 'src/mapping/IProfile';
import { IUser } from 'src/mapping/IUser';
import { IRecoveryQuestion } from 'src/mapping/IRecoveryQuestion';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './app-forgot-password-page.component.html',
    styleUrls: ['./app-forgot-password-page.component.sass']
})
export class AppForgotPasswordPageComponent {
    isSuccess: boolean = false;
    isLoading: boolean = false;

    error: string = "";
    questions: Array<IRecoveryQuestion> = [];
    email: string = null;
    recoveryQuestionAnswer: string = null;
    selectedQuestion: number = null;
    password: string = "";
    passwordRepeat: string = "";

    constructor(
        private httpService: AppService,
        private router: Router
    ) {
        this.isLoading = true;

        setTimeout(() => {
            this.httpService.getRecoveryQuestions().subscribe(
                (resp) => {
                    this.questions = resp.body;
                    this.isLoading = false;
                },
                (err) => {
                    this.error = err.error.Message;
                    this.isLoading = false;
                });
        }, 1000);
    }

    onCancel() {
        this.isSuccess = false;
        this.error = "";
        this.router.navigateByUrl('/login');
    }

    onRequestRecover() {
        this.error = "";
        if (!this.recoveryQuestionAnswer || !this.email || !this.password || !this.passwordRepeat || !this.selectedQuestion) {
            this.error = "Alle velden zijn verplicht!";
            return;
        }

        if (this.passwordRepeat != this.password) {
            this.error = "Wachtwoorden komen niet overeen!";
            return;
        }

        this.isLoading = true;
        let recoverUser: IUser = {
            Id: 0,
            Password: this.password,
            Username: null,
            Email: this.email,
            RecoveryId: this.selectedQuestion,
            RecoveryAnswer: this.recoveryQuestionAnswer,
            Name: null,
            DateOfBirth: null,
            Cookie: null
        }

        setTimeout(() => {
            this.httpService.recoverUser(recoverUser).subscribe(
                (resp) => {
                    this.isSuccess = true;
                    this.isLoading = false;
                },
                (err) => {
                    this.isSuccess = false;
                    this.isLoading = false;
                    this.error = err.error.Message;
                });
        }, 2000);
    }

    hasError(error): boolean {
        return error ? true : false;
    }

    isLoadingQuestions(isLoading: boolean, questions: Array<IRecoveryQuestion>): boolean {
        if (isLoading && questions.length == 0) {
            return true;
        }

        return false;
    }
}
