import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IProfile } from 'src/mapping/IProfile';
import { Observable } from 'rxjs';
import { IUser } from 'src/mapping/IUser';

@Injectable()
export class AppService {
    constructor(
        private http: HttpClient,
    ) { }

    private readonly API_URL: string = "http://www.localhost:8080/backend/api/";

    getUsers(): Observable<HttpResponse<Array<IProfile>>> {
        return this.http.get<Array<IProfile>>(`${this.API_URL}users`, { observe: 'response' });
    }

    loginUser(user: IUser): Observable<HttpResponse<IProfile>> {
        return this.http.post<IProfile>(`${this.API_URL}login`, user, { observe: 'response' });
    }
}