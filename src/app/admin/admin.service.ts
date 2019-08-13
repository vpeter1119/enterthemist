import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Themebook } from './themebooks/themebook.model';
import { Character } from '../../characters/character.model';
import { AuthData } from '../../auth/auth-data.model';

export class Response {
  m: Themebook[];
  l: Themebook[]
}

@Injectable({providedIn: 'root'})
export class AdminService {

  apiUrl = "https://ztold.sse.codesandbox.io/api"

  mythosTbs: Themebook[];
  logosTbs: Themebook[];
  allCharacters: Character [];
  allTbsSub = new Subject<Themebook[]>();
  allCharsSub = new Subject<Character[]>();
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

}