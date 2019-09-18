import { Injectable } from '@angular/core';

@Injectable({providedIn: "root"})
export class TextConvertService {

  constructor() { }

  capitalize(s) {
    if (typeof s !== 'string') {
      return '';
    } else {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }

  stringToDate(s: string) {
    return new Date(s);
  }

  splitP(s) {
    return s.split("\n");
  }

}