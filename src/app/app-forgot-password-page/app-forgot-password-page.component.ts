import { Component, ReflectiveInjector } from '@angular/core';
import { AppService } from '../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { IProfile } from 'src/mapping/IProfile';
import { IUser } from 'src/mapping/IUser';
import { IRecoveryQuestion } from 'src/mapping/IRecoveryQuestion';
import { ICookieUser } from 'src/mapping/ICookieUser';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './app-forgot-password-page.component.html',
    styleUrls: ['./app-forgot-password-page.component.sass']
})
export class AppForgotPasswordPageComponent {
    isSuccess = false;
    isLoading = false;

    newUser: ICookieUser;
    error = '';
    questions: Array<IRecoveryQuestion> = [];
    email: string = null;
    recoveryQuestionAnswer: string = null;
    selectedQuestion: number = null;
    password = '';
    passwordRepeat = '';

    constructor(
        private httpService: AppService,
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.isLoading = true;
        this.newUser = null;

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

    onCancel(): void {
        this.isSuccess = false;
        this.error = '';
        this.router.navigateByUrl('/login');
    }

    GetUsers(): void {
        this.httpService.getUsers();
    }

    onRequestRecover(): void {
        this.error = '';
        if (!this.recoveryQuestionAnswer || !this.email || !this.password || !this.passwordRepeat || !this.selectedQuestion) {
            this.error = 'Alle velden zijn verplicht!';
            return;
        }

        if (this.passwordRepeat !== this.password) {
            this.error = 'Wachtwoorden komen niet overeen!';
            return;
        }

        this.isLoading = true;
        const recoverUser: IUser = {
            Id: 0,
            Password: this.password,
            Username: null,
            Email: this.email,
            RecoveryId: this.selectedQuestion,
            RecoveryAnswer: this.recoveryQuestionAnswer,
            Name: null,
            DateOfBirth: null,
            Cookie: null
        };

        setTimeout(() => {
            this.httpService.recoverUser(recoverUser).subscribe(
                (resp) => {
                    this.isSuccess = true;
                    this.isLoading = false;
                    this.newUser = resp.body;
                },
                (err) => {
                    this.isSuccess = false;
                    this.isLoading = false;
                    this.error = err.error.Message;
                });
        }, 2000);
    }

    onChangeDone(): void {
        this.authenticationService.redirectUrl = '/profile';
        this.authenticationService.setCurrentUser(this.newUser);
    }

    hasError(error): boolean {
        return error ? true : false;
    }

    isLoadingQuestions(isLoading: boolean, questions: Array<IRecoveryQuestion>): boolean {
        if (isLoading && questions.length === 0) {
            return true;
        }

        return false;
    }
}
