import { Component } from '@angular/core';
import { AppService } from './../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { IProfile } from 'src/mapping/IProfile';
import { IUser } from 'src/mapping/IUser';
import { IRecoveryQuestion } from 'src/mapping/IRecoveryQuestion';

@Component({
    selector: 'app-register',
    templateUrl: './app-register-page.component.html',
    styleUrls: ['./app-register-page.component.sass']
})
export class AppRegisterPageComponent {
    step = 1;
    error = '';
    isLoading = false;
    questions: Array<IRecoveryQuestion> = [];

    username: string;
    password: string;
    passwordRepeat: string;
    name: string;
    email: string;
    date: Date;
    length: number;
    weigth: number;
    recoveryQuestionAnswer: string = null;
    selectedQuestion: number = null;

    constructor(
        private authenticationService: AuthenticationService,
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

    onRegisterUser(): void {
        this.error = '';
        if (!this.username || !this.password || !this.passwordRepeat
            || !this.name || !this.email || !this.date
            || !this.selectedQuestion || !this.recoveryQuestionAnswer) {
            this.error = 'Alle velden zijn verplicht!';
            return;
        }

        if (this.password !== this.passwordRepeat) {
            this.error = 'Wachtwoorden komen niet overeen!';
            return;
        }

        this.isLoading = true;
        const userData = {
            Username: this.username,
            Email: this.email
        };

        setTimeout(() => {
            this.httpService.checkAvailability(userData).subscribe(
                (resp) => {
                    this.step = 2;
                    this.isLoading = false;
                },
                (err) => {
                    this.error = err.error.Message;
                    this.isLoading = false;
                });
        }, 1000);
    }

    onRegisterProfile(): void {
        if (!this.length || !this.weigth) {
            this.error = 'Alle velden zijn verplicht!';
            return;
        }

        this.isLoading = true;

        const profile: IProfile = {
            Id: 0,
            IsLazy: false,
            Length: this.length,
            Location: {
                Latitude: this.httpService.getPosition().latitude,
                Longitude: this.httpService.getPosition().longitude,
                Id: 0
            },
            LocationId: 0,
            User: {
                DateOfBirth: this.date,
                Email: this.email,
                Id: 0,
                Name: this.name,
                Password: this.password,
                RecoveryAnswer: this.recoveryQuestionAnswer,
                RecoveryId: this.selectedQuestion,
                Username: this.username,
                Cookie: null
            },
            UserId: 0,
            Weigth: this.weigth
        };

        setTimeout(() => {
            this.httpService.registerProfile(profile).subscribe(
                (resp) => {
                    this.authenticationService.setCurrentUser(resp.body);
                    this.isLoading = false;
                },
                (err) => {
                    this.error = err.error.Message;
                    this.isLoading = false;
                });
        }, 1000);
    }

    onCancel(): void {
        this.router.navigateByUrl('/login');
    }

    onClearError(): void {
        this.error = '';
    }

    hasError(error): boolean {
        return error ? true : false;
    }

    checkIfStep(step: number): boolean {
        return step === this.step ? true : false;
    }

    isLoadingQuestions(isLoading: boolean, questions: Array<IRecoveryQuestion>): boolean {
        if (isLoading && questions.length === 0) {
            return true;
        }

        return false;
    }
}
