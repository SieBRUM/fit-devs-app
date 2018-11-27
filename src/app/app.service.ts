import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IProfile } from 'src/mapping/IProfile';
import { Observable } from 'rxjs';
import { IUser } from 'src/mapping/IUser';
import { IRecoveryQuestion } from 'src/mapping/IRecoveryQuestion';
import { ICookieUser } from 'src/mapping/ICookieUser';

@Injectable()
export class AppService {
    private readonly API_URL: string = "http://localhost:8080/backend/api/";
    private location: Coordinates;

    constructor(
        private http: HttpClient
    ) {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((response) => { this.location = response.coords }, (error) => {
                switch (error.code) {
                    case (error.PERMISSION_DENIED):
                        console.log("permission denied");
                        break;
                    case (error.POSITION_UNAVAILABLE):
                        console.log("position unavailable");
                        break;
                    case (error.TIMEOUT):
                        console.log("position timeout");
                        break;
                }
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    }


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

    getPosition(): Coordinates {
        return this.location;
    }
}