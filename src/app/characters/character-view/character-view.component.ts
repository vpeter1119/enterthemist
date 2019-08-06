import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { 
  trigger, 
  transition, 
  animate, 
  style, 
  keyframes, 
  state 
  } from '@angular/animations'

import { CharactersService } from '../characters.service';
import { Character } from '../character.model';
import { IconsService } from '../../assets/icons.service';
import { ReactiveService } from '../../reactive.service';

@Component({
  selector: 'app-character-view',
  templateUrl: './character-view.component.html',
  styleUrls: ['./character-view.component.css']
})
export class CharacterViewComponent implements OnInit, OnDestroy {

  isLoading = false;
  icons;
  objectKeys = Object.keys;
  data;
  mobile: boolean;
  windowWidth;

  requestedCharacterSub: Subscription;
  character: Character;
  cards = [];

  swiperConfig = {
    pagination: { 
      el: '.swiper-pagination', 
      clickable: true,
      renderBullet: (index) => {
        return '<span class="swiper-pagination-bullet" style="height: 20px; width: 20px; margin: 1rem 10px;"></span>'
      }
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private iconsService: IconsService,
    private reactive: ReactiveService,
  ) {
    this.icons = this.iconsService.getIcons();
   }

  ngOnInit() {
    this.windowWidth = window.screen.width;
    this.mobile = true;
    this.mobile = this.reactive.isMobile();
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    this.requestedCharacterSub = this.charactersService.getOneListener(id)
    .subscribe(character => {      
      this.character = character[0];
      this.data = character[0];
      this.cards = character[0].cards;
      this.isLoading = false;
    })
  }

  getValues(obj) {
    var rawValues = Object.values(obj);
    return rawValues.join("");
  }

  getCardType(obj) {
    return Object.values(obj).join("");
  }

  onBackToCharacters() {
    this.router.navigate(['characters']);
  }

  ngOnDestroy() {
    this.requestedCharacterSub.unsubscribe();
  }

}