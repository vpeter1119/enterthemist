import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

import { AdminService } from './admin/admin.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy  {
  
  apiUrl = 'http://etm-server.herokuapp.com/api/admin';
  serverIsUp = true;
  statusSub: Subscription;

  constructor(
    private http: HttpClient,
    private admin: AdminService,
  ) {}

  ngOnInit() {
    var url = (this.apiUrl + '/status');
    console.warn("Sending GET request to: " + url);
    this.statusSub = this.admin.getServerStatus()
    .subscribe((response: boolean) => {
      console.warn(response);
      this.serverIsUp = response;
    });
  }

  ngOnDestroy() {
    this.statusSub.unsubscribe();
  }

}
