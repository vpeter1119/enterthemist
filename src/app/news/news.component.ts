import { Component, OnInit } from '@angular/core';
import  { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  userIsAdmin: boolean;
  isLoading: boolean = false;;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userIsAdmin = this.auth.getIsAdmin();
  }

  onAddArticle() {
    this.router.navigate(['/news/add']);
  }

}