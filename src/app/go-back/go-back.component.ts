import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.css']
})
export class GoBackComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loc: Location,
  ) { }

  ngOnInit() {
  }

  onGoBack() {
    this.loc.back();
  }

}