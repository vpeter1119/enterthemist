import { Component, OnInit, OnDestroy } from '@angular/core';
import  { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { NewsService } from './news.service';
import { Article } from './article.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  userIsAdmin: boolean;
  isLoading: boolean = false;

  articles: Article[];
  articlesSub: Subscription;

  constructor(
    private auth: AuthService,
    private news: NewsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userIsAdmin = this.auth.getIsAdmin();
    this.articlesSub = this.news.getAllArticles()
    .subscribe((articles: Article[]) => {
      this.articles = articles;
    })
  }

  onAddArticle() {
    this.router.navigate(['/news/add']);
  }

  stringToDate(s: string) {
    return new Date(s);
  }

  ngOnDestroy() {
    this.articlesSub.unsubscribe();
  }

}