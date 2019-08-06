import { Injectable } from '@angular/core';
import { 
  faMask,
  faBolt,
  faTrashAlt,
  faEye,
  faPencilAlt,
   } from '@fortawesome/free-solid-svg-icons';

@Injectable({providedIn: "root"})
export class IconsService {

  //Icons
  icons = {
    mythos: faBolt,
    logos: faMask,
    delete: faTrashAlt,
    view: faEye,
    edit: faPencilAlt
  }  

  constructor() { }

  getIcons() {
    return this.icons;
  }

}