import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Article } from './article.model';

@Injectable({providedIn: 'root'})
export class NewsService {

  apiUrl='https://etm-server.herokuapp.com/api';
  allArticles: Article[];
  reqArticle: Article;
  articlesSub = new Subject<Article[]>();
  reqArticleSub = new Subject<Article>();

  constructor(
    private http: HttpClient,
  ) { }

  postNewArticle(data: Article) {
    var newArticle: Article = data;
    var url = (this.apiUrl + '/articles');
    this.http.post(url, newArticle, {observe: 'response'})
    .subscribe(response => {
      console.warn(response);
    });
  }

  fetchAllArticles() {
    var url = (this.apiUrl + '/articles');
    this.http.get<Article[]>(url)
    .subscribe(allArticles => {
      this.allArticles = allArticles;
      this.articlesSub.next([...this.allArticles]);
    })
  }

  fetchOneArticle(id) {
    var url = (this.apiUrl + '/articles/' + id);
    this.http.get<Article>(url)
    .subscribe(fetchedArticle => {
      this.reqArticle = fetchedArticle;
      this.reqArticleSub.next(this.reqArticle);
    })
  }

  getAllArticles() {
    this.fetchAllArticles();
    return this.articlesSub.asObservable();
  }

  getOneArticle(id) {
    this.fetchOneArticle(id);
    return this.reqArticleSub.asObservable();
  }

}