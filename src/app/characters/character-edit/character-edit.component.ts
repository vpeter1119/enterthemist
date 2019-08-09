import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Character } from '../character.model';
import { CharactersService } from '../characters.service';
import { IconsService } from '../../assets/icons.service';
import { TextConvertService } from '../../assets/text-convert.service';
import { ReactiveService } from '../../reactive.service';

@Component({
  selector: 'app-character-edit',
  templateUrl: './character-edit.component.html',
  styleUrls: ['./character-edit.component.css']
})
export class CharacterEditComponent implements OnInit, OnDestroy {

  isLoading = false;
  generalIsLoading = false;
  icons;
  objectKeys = Object.keys;
  data;
  mobile: boolean;
  windowWidth;

  requestedCharacterSub: Subscription;
  character: Character;
  cards = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private iconsService: IconsService,
    private reactive: ReactiveService,
    private _text: TextConvertService
  ) { 
    this.icons = this.iconsService.getIcons();
  }

  ngOnInit() {
    this.windowWidth = window.screen.width;
    this.mobile = true;
    this.mobile = this.reactive.isMobile();
    this.isLoading = true;
    this.generalIsLoading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (this.requestedCharacterSub) {
      this.requestedCharacterSub.unsubscribe();
    }
    this.requestedCharacterSub = this.charactersService.getOneListener(id)
    .subscribe(character => {      
      this.character = character[0];
      this.data = character[0];
      this.cards = character[0].cards;
      this.isLoading = false;
      this.generalIsLoading = false;
    })
  }

  onUpdateGeneral(form) {
    const id = this.route.snapshot.paramMap.get('id');
    this.charactersService.updateCharacter(id, form.value);
    this.generalIsLoading = true;
    this.character.name = form.value.name;
    this.character.mythos = form.value.mythos;
    this.character.logos = form.value.logos;
    setTimeout(() => {
      this.generalIsLoading = false;
    }, 200);
  }

  onUpdateCard(form) {
    console.warn(form.value);
  }

  updateCard(cardTheme, data) {
    this.character.cards.forEach(card => {
      if (card.theme === cardTheme) {
        card = data;
        return;
      }
    });
  }

  getValues(obj) {
    var rawValues = Object.values(obj);
    return rawValues.join("");
  }

  getCardType(obj) {
    return Object.values(obj).join("");
  }

  ngOnDestroy() {
    this.requestedCharacterSub.unsubscribe();
  }

}