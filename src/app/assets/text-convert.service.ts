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

  convertDate(dateString) {
    var year = parseInt(dateString.substring(0,4));    
    var month = parseInt(dateString.substring(5,7));
    var day = parseInt(dateString.substring(8,10));
    var hour = parseInt(dateString.substring(11,13));
    var min = parseInt(dateString.substring(14,16));
    var sec = parseInt(dateString.substring(17,19));
    var convertedDate = {
        year: year,
        month: month,
        day: day,
        hour: hour,
        min: min,
        sec: sec
    }
    return convertedDate;
  }

}