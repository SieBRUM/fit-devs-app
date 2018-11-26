import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IProfile } from 'src/mapping/IProfile';
import { Observable } from 'rxjs';
import { IUser } from 'src/mapping/IUser';

@Injectable()
export class AppService {
    private readonly API_URL: string = "http://www.localhost:8080/backend/api/";
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

    loginUser(user: IUser): Observable<HttpResponse<IProfile>> {
        return this.http.post<IProfile>(`${this.API_URL}login`, user, { observe: 'response' });
    }

    registerUser(profile: IProfile): Observable<HttpResponse<IProfile>> {
        return this.http.post<IProfile>(`${this.API_URL}login`, profile, { observe: 'response' });
    }

    getPosition(): Coordinates {
        return this.location;
    }
}