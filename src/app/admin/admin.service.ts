import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AdminService {

  apiUrl = "https://ztold.sse.codesandbox.io/api"

  constructor(
    private http: HttpClient
  ) { }

  addNewThemebook(tbdata) {
    this.http.post(this.apiUrl + '/themebooks', tbdata)
    .subscribe((response) => {
      console.log('Message from server: ' + response);
    })
  }

}