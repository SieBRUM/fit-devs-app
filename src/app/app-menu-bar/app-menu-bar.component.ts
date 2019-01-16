import { Component, AfterViewInit, Renderer } from '@angular/core';
import { AppService } from './../app.service';
import { AuthenticationService } from '../authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AppInviteWorkoutDialogComponent } from '../app-invite-workout-dialog/app-invite-workout-dialog.component';

@Component({
    selector: 'app-menu-bar',
    templateUrl: './app-menu-bar.component.html',
    styleUrls: ['./app-menu-bar.component.sass']
})
export class AppMenuBarComponent implements AfterViewInit {
    searchUsername = '';

    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private appService: AppService,
        private render: Renderer,
        private dialog: MatDialog
    ) {
        this.activatedRoute.queryParams.subscribe(
            (resp) => {
                this.searchUsername = resp['query'];
            }
        );

    }
    onClickShow(): void {
        const dialogRef = this.dialog.open(AppInviteWorkoutDialogComponent, {
            disableClose: true,
            minWidth: '100vh',
            minHeight: '40vh'
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {

            }
        });
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

    isActive(route: string): boolean {
        return this.router.url === route;
    }

    onSearchUsername(): void {
        if (!this.searchUsername) {
            return;
        }

        this.router.navigate(['/search'], { queryParams: { query: this.searchUsername } });
    }

    ngAfterViewInit(): void {
        const bar = document.querySelector('mat-ink-bar');
        this.render.setElementStyle(bar, 'backgroundColor', 'white');
        this.render.setElementStyle(bar, 'opacity', '.6');
    }
}
