import { Injectable } from '@angular/core';
import { 
  faMask,
  faBolt,
  faTrashAlt,
  faEye,
  faPencilAlt,
  faUserSecret,
  faBookOpen,
  faExclamation,
  faList,
  faSyncAlt,
  faFireAlt,
   } from '@fortawesome/free-solid-svg-icons';

@Injectable({providedIn: "root"})
export class IconsService {

  //Icons
  icons = {
    mythos: faBolt,
    logos: faMask,
    delete: faTrashAlt,
    view: faEye,
    edit: faPencilAlt,
    character: faUserSecret,
    themebook: faBookOpen,
    exclamation: faExclamation,
    list: faList,
    flip: faSyncAlt,
    burn: faFireAlt,
  }  

  constructor() { }

  getIcons() {
    return this.icons;
  }

}