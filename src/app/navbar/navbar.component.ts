import { Component, OnInit } from '@angular/core';
import { 
  faMask,
  faBolt
   } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faMask = faMask;
  faBolt = faBolt;

  isCollapsed = true;

  constructor() { }

  ngOnInit() {
  }

}