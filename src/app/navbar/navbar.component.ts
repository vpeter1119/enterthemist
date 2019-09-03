import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

import { IconsService } from '../assets/icons.service';
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  icons;
  isCollapsed = true;
  userIsAuthenticated = false;
  userIsAdmin = false;
  private authListenerSubs: Subscription;
  private adminListenerSubs: Subscription;

  constructor(
    private iconsService: IconsService,
    private authService: AuthService,
  ) {
    this.icons = this.iconsService.getIcons();
   }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getIsAdmin();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
    this.adminListenerSubs = this.authService
      .getAdminStatusListener()
      .subscribe(isAdmin => {
        this.userIsAdmin = isAdmin;
      });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
    this.adminListenerSubs.unsubscribe();
  }

}