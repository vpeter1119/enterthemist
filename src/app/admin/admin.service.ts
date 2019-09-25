import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

import { Themebook } from './themebooks/themebook.model';
import { Character } from '../characters/character.model';
import { AuthData } from '../auth/auth-data.model';

export class Response {
  m: Themebook[];
  l: Themebook[]
}

@Injectable({providedIn: 'root'})
export class AdminService {

  apiUrl = "https://etm-server.herokuapp.com/api"

  mythosTbs: Themebook[];
  logosTbs: Themebook[];
  allCharacters: Character [];
  allTbsSub = new Subject<Response>();
  allCharsSub = new Subject<Character[]>();
  allUsersSub = new Subject<AuthData[]>();
  allUsers: AuthData[];
  response: Response;
  serverStatus: boolean;
  statusSub = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  fetchServerStatus() {
    var url = (this.apiUrl + '/admin/status');
    console.warn('Sending GET request to: ' + url);
    this.http.get(url, {observe: 'response'})
    .subscribe(
      (response) => {
      console.warn('Server response code: ' + response.status);
      console.warn('Response body: ' + response.body);
      if (response.status === 200) {
        this.serverStatus = true;
        this.statusSub.next(this.serverStatus);
      } else {
        this.serverStatus = false;
        this.statusSub.next(this.serverStatus);
      }
      },
      (error) => {
      this.serverStatus = false;
      this.statusSub.next(this.serverStatus);
      }
    )
  }

  getServerStatus() {
    this.fetchServerStatus();
    return this.statusSub.asObservable();
  }

  addNewThemebook(tbdata) {
    this.http.post(this.apiUrl + '/themebooks', tbdata)
    .subscribe((response) => {
      console.log('Message from server: ' + response);
    })
  }

  replaceThemebook(tbdata) {
    this.http.put(this.apiUrl + '/themebooks', tbdata)
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

  getAllTbs(): Observable<Response> {
    this.fetchAllThemebooks();
    return this.allTbsSub.asObservable();
  }

  fetchAllCharacters() {
    this.http.get<Character[]>(this.apiUrl + '/admin/characters')
    .subscribe((data) => {
      this.allCharacters = data;
      this.allCharsSub.next([...this.allCharacters]);
    })
  }

  getAllChars() {
    this.fetchAllCharacters();
    return this.allCharsSub.asObservable();
  }

  finalDelete(id) {
    this.http.delete<Character[]>(this.apiUrl + '/admin/characters/' + id)
    .subscribe((response) => {
      console.log('Message from server: ' + response);
    })
  }

  fetchAllUsers() {
    this.http.get<AuthData[]>(this.apiUrl + '/admin/users')
    .subscribe((data) => {
      this.allUsers = data;
      this.allUsersSub.next([...this.allUsers]);
    })
  }

  getAllUsers() {
    this.fetchAllUsers();
    return this.allUsersSub.asObservable();
  }

}