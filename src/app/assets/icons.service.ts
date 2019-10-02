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
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faTools,
  faTrashRestoreAlt,
  faPlus,
  faUser,
  faNewspaper,
  faTimes,
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
    login: faSignInAlt,
    logout: faSignOutAlt,
    signup: faUserPlus,
    admin: faTools,
    restore: faTrashRestoreAlt,
    plus: faPlus,
    user: faUser,
    news: faNewspaper,
    x: faTimes,
  }  

  constructor() { }

  getIcons() {
    return this.icons;
  }

}