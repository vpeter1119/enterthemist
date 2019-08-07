import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Themebook } from './themebooks/themebook.model';

export class Response {
  m: Themebook[];
  l: Themebook[]
}

@Injectable({providedIn: 'root'})
export class AdminService {

  apiUrl = "https://ztold.sse.codesandbox.io/api"

  mythosTbs: Themebook[];
  logosTbs: Themebook[];
  allTbsSub = new Subject<Themebook[]>();
  response: Response;

  constructor(
    private http: HttpClient
  ) { }

  addNewThemebook(tbdata) {
    this.http.post(this.apiUrl + '/themebooks', tbdata)
    .subscribe((response) => {
      console.log('Message from server: ' + response);
    })
  }

  fetchAllThemebooks() {
    this.http.get<{
      mythosTbs: Themebook[],
      logosTbs: Themebook[]
      }>(this.apiUrl + '/themebooks')
    .subscribe((data) => {
      this.mythosTbs = data.mythosTbs;
      this.logosTbs = data.logosTbs;
      this.response = {
        m: this.mythosTbs,
        l: this.logosTbs
      }
      this.allTbsSub.next(this.response);
    })
  }

  getAllTbs() {
    this.fetchAllThemebooks();
    return this.allTbsSub.asObservable();
  }

}