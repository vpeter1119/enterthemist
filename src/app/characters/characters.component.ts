import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Character } from './character.model';
import { CharactersService } from './characters.service';
import { IconsService } from '../assets/icons.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {

  isLoading = false;
  icons;
  allCharactersSub: Subscription;
  characters: Character[];

  constructor(
    private router: Router,
    private charactersService: CharactersService,
    private iconsService: IconsService,
  ) {
    this.icons = this.iconsService.getIcons();
   }

  ngOnInit() {
    this.isLoading = true;
    this.allCharactersSub = this.charactersService.getAllListener()
    .subscribe(allCharacters => {
      this.characters = allCharacters;
      this.isLoading = false;
    })
  }

  onView(charid) {
    this.router.navigate(['characters/'+charid]);
  }

  onAddCharacter() {
    this.router.navigate(['characters/create']);
  }

  ngOnDestroy() {
    this.allCharactersSub.unsubscribe();
  }

}