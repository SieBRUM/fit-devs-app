import { Component } from '@angular/core';
import { AppService } from './app.service';
import { IProfile } from 'src/mapping/IProfile';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'fit-devs-app';
  profiles: Array<IProfile>;

  constructor(
    private HttpService: AppService,
    private AuthenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.HttpService.getUsers()
      .subscribe(
        (resp) => {
          console.log(resp);
          console.log(resp.body[0].Location.Longitude);
          this.profiles = resp.body;
        },
        (err) => {
          console.log(err);
        });
  }
}
