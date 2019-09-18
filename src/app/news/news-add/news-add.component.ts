import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '../../auth/auth.service';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {

  userId;

  constructor(
    private auth: AuthService,
    private news: NewsService,
    private fb: FormBuilder,
  ) { }

  articleForm = this.fb.group({
    title: [''],
    content: [''],
    author: this.userId,
  });

  ngOnInit() {
    this.userId = this.auth.getUserId();
    this.articleForm.patchValue({
      author: this.userId
    });
  }

  onArticleSubmit() {
    var data = this.articleForm.value;
    this.news.postNewArticle(data);
    this.articleForm.reset();
  }

}