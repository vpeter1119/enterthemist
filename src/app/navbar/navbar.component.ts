import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IconsService } from '../assets/icons.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  icons;

  isCollapsed = true;

  constructor(
    private iconsService: IconsService,
  ) {
    this.icons = this.iconsService.getIcons();
   }

  ngOnInit() {
  }

}