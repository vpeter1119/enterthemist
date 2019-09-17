import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GoBackComponent } from '../../go-back/go-back.component';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {

  userId;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id;
  }

  onGoBack() {
    this.loc.back();
  }

}