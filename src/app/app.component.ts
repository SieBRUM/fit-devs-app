import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { IProfile } from 'src/mapping/IProfile';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'fit-devs-app';
  profiles: Array<IProfile>;

  constructor(
    private HttpService: AppService
  ) { }

  ngOnInit() {
    this.HttpService.getUsers()
      .subscribe(
        (resp) => {
          this.profiles = resp.body;
        },
        (err) => {
          console.log(err);
        });
  }
}
