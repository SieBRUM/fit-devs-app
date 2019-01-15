import { Component, AfterViewInit, ElementRef, AfterContentInit } from '@angular/core';

declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './app-home-page.component.html',
    styleUrls: ['./app-home-page.component.sass']


})
export class AppHomePageComponent implements AfterContentInit {
    ngAfterContentInit(): void {
        $('.carousel').carousel({
            pause: 'false'
        });
    }
}
