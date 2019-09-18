import { Component, OnInit, OnDestroy } from '@angular/core';
import  { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../auth/auth.service';
import { NewsService } from '../news.service';
import { TextConvertService } from '../../assets/text-convert.service'
import { Article } from '../article.model';
import { GoBackComponent } from '../../go-back/go-back.component';

@Component({
  selector: 'app-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.css']
})
export class NewsViewComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  reqArticle: Article;
  articleSub: Subscription;

  constructor(
    private auth: AuthService,
    private news: NewsService,
    public conv: TextConvertService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.articleSub = this.news.getOneArticle(id)
    .subscribe((articleData: Article) => {
      this.reqArticle = articleData;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe();
  }

}