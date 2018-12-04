import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlSegment } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {
        return this.checkLogin(state.url);
    }

    checkLogin(url: string): boolean {
        // Can access route if not logged in, but page HAS TO BE login / register
        // TODO: add Forgot password page and home page

        if (!this.authService.isLoggedIn()) {
            if (url === '/login' || url === '/register' || url === '/recover') {
                return true;
            }
        } else {
            // Can access route if logged in AND not routing to login page / register page
            if (url !== '/login' && url !== '/register' && url !== '/recover') {
                return true;
            }
        }
        console.log(`User did NOT get access to route ${url} because login status is ${this.authService.isLoggedIn()}`);

        if (url === '/login' || url === '/register' || url === '/recover') {
            this.router.navigateByUrl('/home');
            return false;
        }

        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
