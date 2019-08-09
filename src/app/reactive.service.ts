import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ReactiveService {

  mobile: boolean;

  constructor() { }

  isMobile() {
    if (window.screen.width < 768) { // 768px portrait
      return true;
    } else {
      return false;
    }
  }

}