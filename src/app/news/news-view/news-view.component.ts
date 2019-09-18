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
  reqArticle;
  author;
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
    .subscribe((response: {articleData: Article, authorData}) => {
      this.reqArticle = response.articleData;
      this.reqArticle.content = this.conv.splitP(response.articleData.content);
      this.author = response.authorData;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.articleSub.unsubscribe();
  }

}