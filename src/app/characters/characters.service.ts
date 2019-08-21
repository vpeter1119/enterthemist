import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Character } from './character.model';

@Injectable({providedIn: "root"})
export class CharactersService {

  //apiUrl = "https://etm-server.herokuapp.com/api/characters/";
  apiUrl = "https://ztold.sse.codesandbox.io/api/characters/";

  allCharactersSub = new Subject<Character[]>();
  allCharacters: Character[];
  oneCharacterSub = new Subject<Character>();
  requestedCharacter: Character;

  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    const url = (this.apiUrl);
    console.warn("Sending GET request to: " + url);
    this.http.get<Character[]>(url)
    .subscribe(characters => {
      this.allCharacters = characters;
      this.allCharactersSub.next([...this.allCharacters]);
    })
  }

  getAllListener() {
    this.getAll();
    return this.allCharactersSub.asObservable();
  }

  getOne(id) {
    const url = (this.apiUrl + id);
    console.warn("Sending GET request to: " + url);
    this.http.get<Character>(url)
    .subscribe(character => {
      this.requestedCharacter = character;
      this.oneCharacterSub.next(this.requestedCharacter);
    })
  }

  getOneListener(id) {
    this.getOne(id);
    return this.oneCharacterSub.asObservable();
  }

  createCharacter(character) {
    this.http.post<{message: string}>(this.apiUrl, character)
    .subscribe((response) => {
      console.warn('Message from server: ' + response.message);
    })
  }

  updateCharacter(id, data) {
    const url = (this.apiUrl + id);
    console.warn("Sending POST request to: " + url);
    this.http.patch<{message: string}>(url, {data: data})
    .subscribe((response) => {
      console.warn('Message from server: ' + response.message);
    })
  }

  deleteCharacter(id) {
    const url = (this.apiUrl + id);
    console.warn("Sending request to: " + url);
    this.http.delete<{message: string}>(url)
    .subscribe((response) => {
      console.warn('Message from server: ' + response.message);
    });
  }

  restoreCharacter(id) {
    const url = (this.apiUrl + id);
    console.warn("Sending request to: " + url);
    const data = {
      deleted: false
    }
    this.http.patch<{message: string}>(url, {data: data})
    .subscribe((response) => {
      console.warn('Message from server: ' + response.message);
    })
  }

}