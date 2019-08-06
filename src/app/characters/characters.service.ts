import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Character } from './character.model';

@Injectable({providedIn: "root"})
export class CharactersService {

  apiUrl = "https://ztold.sse.codesandbox.io/api";

  allCharactersSub = new Subject<Character[]>();
  allCharacters: Character[];
  oneCharacterSub = new Subject<Character>();
  requestedCharacter: Character;

  constructor(
    private http: HttpClient,
  ) { }

  getAll() {
    this.http.get<Character[]>(this.apiUrl+"/characters")
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
    const url = (this.apiUrl + "/character/" + id);
    console.log("Sending request to: " + url);
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

}