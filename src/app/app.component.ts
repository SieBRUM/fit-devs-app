import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { IProfile } from 'src/mapping/IProfile';
import { AuthenticationService } from './authentication.service';
import { WebsocketService } from './websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  profiles: Array<IProfile>;

  constructor(
    private HttpService: AppService,
    private webSocketService: WebsocketService
  ) { }

  ngOnInit() {
    this.webSocketService.configureWebsocket();
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
