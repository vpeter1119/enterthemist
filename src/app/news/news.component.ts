import { Component, OnInit, OnDestroy } from '@angular/core';
import  { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { NewsService } from './news.service';
import { TextConvertService } from '../assets/text-convert.service';
import { IconsService } from '../assets/icons.service';
import { Article } from './article.model';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {

  userIsAdmin: boolean;
  isLoading: boolean = true;
  icons;

  articles: Article[];
  articlesSub: Subscription;

  constructor(
    private auth: AuthService,
    private news: NewsService,
    private iconsService: IconsService,
    public conv: TextConvertService,

    private router: Router,
  ) {
    this.icons = this.iconsService.getIcons();
   }

  ngOnInit() {
    this.isLoading = true;
    this.userIsAdmin = this.auth.getIsAdmin();
    this.articlesSub = this.news.getAllArticles()
    .subscribe((articles: Article[]) => {
      this.articles = this.sortByDate(articles);
    })
    setTimeout(()=>{
      this.isLoading = false;
    }, 500);
  }

  sortByDate(array) {
    return array.sort((a,b) => {
      a = new Date(a.createdAt);
      b = new Date(b.createdAt);
      return a>b ? -1 : a<b ? 1 : 0;
    });
  }

  onAddArticle() {
    this.router.navigate(['/news/add']);
  }

  onDeleteArticle(id) {
    this.news.deleteOneArticle(id);
    this.articles = this.articles.filter(el => el._id != id);
  }

  ngOnDestroy() {
    this.articlesSub.unsubscribe();
  }

}