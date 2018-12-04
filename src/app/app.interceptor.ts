import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AppInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const token = this.authService.getAuthorizationToken();
        if (token) {
            let headers = req.headers;
            headers = req.headers.append('Authorization', token);
            req = req.clone({ headers: headers });
        }

        return next.handle(req);
    }
}
