import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Themebook } from './themebook.model';
import { AdminService } from '../admin.service';
import { AuthService } from '../../auth/auth.service';

export class TbResponse {
  m: Themebook[];
  l: Themebook[]
}

@Component({
  selector: 'app-themebooks',
  templateUrl: './themebooks.component.html',
  styleUrls: ['./themebooks.component.css']
})
export class ThemebooksComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  mythosTbs: Themebook[];
  logosTbs: Themebook[];
  allTbsSub: Subscription;
  ptagletters = ['A','B','C','D','E','F','G','H','I','J'];
  wtagletters = ['A','B','C','D'];

  constructor(
    private admin: AdminService,
    private _auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.allTbsSub = this.admin.getAllTbs()
    .subscribe((response: TbResponse) => {
      this.mythosTbs = response.m;
      this.logosTbs = response.l;
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    this.allTbsSub.unsubscribe();
  }

}