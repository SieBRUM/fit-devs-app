import { Component } from '@angular/core';
import { AppService } from './../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-menu-bar',
    templateUrl: './app-menu-bar.component.html',
    styleUrls: ['./app-menu-bar.component.sass']
})
export class AppMenuBarComponent {
    searchUsername = '';

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.activatedRoute.queryParams.subscribe(
            (resp) => {
                this.searchUsername = resp['query'];
            }
        );

    }

    login(): void {
        this.router.navigateByUrl('/login');
    }

    logout(): void {
        this.authenticationService.logout();
    }

    getUsername(): string {
        return this.authenticationService.getCurrentUserCookie().Name;
    }

    navigate(route: string): void {
        this.router.navigateByUrl(route);
    }

    getClass(route: string): string {
        if (this.router.url === route) {
            return 'btn my-2 my-sm-0 menu-bar-item selected';
        } else {
            return 'btn my-2 my-sm-0 menu-bar-item';
        }
    }

    onSearchUsername(): void {
        if (!this.searchUsername) {
            return;
        }

        this.router.navigate(['/search'], { queryParams: { query: this.searchUsername } });
    }
}
