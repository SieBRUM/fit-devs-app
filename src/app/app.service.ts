import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IProfile } from 'src/mapping/IProfile';
import { Observable, Subject } from 'rxjs';
import { IUser } from 'src/mapping/IUser';
import { IRecoveryQuestion } from 'src/mapping/IRecoveryQuestion';
import { ICookieUser } from 'src/mapping/ICookieUser';
import { IUserFlat } from 'src/mapping/IUserFlat';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AppService {
    private readonly API_URL: string = 'http://localhost:8080/backend/api/';
    private location: Coordinates;

    constructor(
        private http: HttpClient,
        private snack: MatSnackBar
    ) {

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((response) => { this.location = response.coords; }, (error) => {
                switch (error.code) {
                    case (error.PERMISSION_DENIED):
                        console.log('permission denied');
                        break;
                    case (error.POSITION_UNAVAILABLE):
                        console.log('position unavailable');
                        break;
                    case (error.TIMEOUT):
                        console.log('position timeout');
                        break;
                    default:
                        console.log(error);
                        break;
                }
            }, { enableHighAccuracy: true });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    }

    public notifications: Array<any> = [];


    getUsers(): Observable<HttpResponse<Array<IProfile>>> {
        return this.http.get<Array<IProfile>>(`${this.API_URL}users`, { observe: 'response' });
    }

    getRecoveryQuestions(): Observable<HttpResponse<Array<IRecoveryQuestion>>> {
        return this.http.get<Array<IRecoveryQuestion>>(`${this.API_URL}recoveryquestions`, { observe: 'response' });
    }

    getProfile(): Observable<HttpResponse<IProfile>> {
        return this.http.get<IProfile>(`${this.API_URL}profile`, { observe: 'response' });
    }

    loginUser(user: IUser): Observable<HttpResponse<ICookieUser>> {
        return this.http.post<ICookieUser>(`${this.API_URL}login`, user, { observe: 'response' });
    }

    checkAvailability(data: any): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.API_URL}checkavailability`, data, { observe: 'response' });
    }

    registerProfile(profile: IProfile): Observable<HttpResponse<ICookieUser>> {
        return this.http.post<ICookieUser>(`${this.API_URL}register`, profile, { observe: 'response' });
    }

    recoverUser(profile: IUser): Observable<HttpResponse<ICookieUser>> {
        return this.http.post<ICookieUser>(`${this.API_URL}forgotpassword`, profile, { observe: 'response' });
    }

    editUser(profile: IProfile): Observable<HttpResponse<IProfile>> {
        return this.http.post<IProfile>(`${this.API_URL}edituser`, profile, { observe: 'response' });
    }

    getUsersByUsername(username: string): Observable<HttpResponse<Array<IUserFlat>>> {
        return this.http.post<Array<IUserFlat>>(`${this.API_URL}searchfriend`, { Username: username }, { observe: 'response' });
    }

    addFriend(friendId: Number): Observable<HttpResponse<any>> {
        return this.http.post<any>(`${this.API_URL}addfriend`, friendId, { observe: 'response' });
    }

    removeFriend(friendId: Number): Observable<HttpResponse<Array<any>>> {
        return this.http.post<any>(`${this.API_URL}removefriend`, friendId, { observe: 'response' });
    }

    getPosition(): Coordinates {
        return this.location;
    }

}
