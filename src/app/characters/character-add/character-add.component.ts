import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { CharactersService } from '../characters.service';
import { Character } from '../character.model';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.css']
})
export class CharacterAddComponent implements OnInit {

  currentStep = 0;

  newCharacterForm = new FormGroup({
    name: new FormControl(''),
    mythos: new FormControl(''),
    logos: new FormControl(''),
    cards: new FormGroup({
      card1: new FormGroup({
        cardtype: new FormControl(''),
        theme: new FormControl(''),
        title: new FormControl(''),
      }),
    }),
  });

  constructor() { }

  ngOnInit() {
    this.currentStep = 1;
  }

  onSubmit() {
    console.warn(this.newCharacterForm.value);
  }

  onNext() {
    this.currentStep++;
  }

}