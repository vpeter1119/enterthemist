import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CharactersService } from '../characters.service';
import { AdminService } from '../../admin/admin.service';
import { IconsService } from '../../assets/icons.service';
import { Character } from '../character.model';
import { Themebook } from '../../admin/themebooks/themebook.model';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.css']
})
export class CharacterAddComponent implements OnInit, OnDestroy {

  currentStep = 0;
  icons;
  isLoading: boolean;
  mythosTbs: Themebook[];
  logosTbs: Themebook[];
  allTbs: Themebook[]
  allTbsSub: Subscription;
  ptagletters = ['A','B','C','D','E','F','G','H','I','J'];
  wtagletters = ['A','B','C','D'];
  newCharacter: Character = {
    cards: ['']
  };
  selectedTbType = 'none';

  constructor(
    private admin: AdminService,
    private fb: FormBuilder,
    private iconsService: IconsService,
  ) {
    this.icons = this.iconsService.getIcons();
   }

  newCharacterForm = this.fb.group({
    name: [''],
    mythos: [''],
    logos: [''],
  });

  cardForm = this.fb.group({
    theme: [''],
    title: [''],
    qors: [''],
    ptags: this.fb.array([]),
    wtags: this.fb.array([]),
  });

  ngOnInit() {
    this.isLoading = true;
    this.allTbs = [];
    this.newCharacter.cards = [];
    this.allTbsSub = this.admin.getAllTbs()
    .subscribe((response) => {
      this.mythosTbs = response.m;
      this.logosTbs = response.l;
      this.mythosTbs.forEach((mtb) => {
        this.allTbs.push(mtb);
      });
      this.logosTbs.forEach((ltb) => {
        this.allTbs.push(ltb);
      });
      this.isLoading = false;
    })
    this.currentStep = 1;
  }

  onCharacterSubmit() {
    this.newCharacter = {
      name: this.newCharacterForm.value.name,
      mythos: this.newCharacterForm.value.mythos,
      logos: this.newCharacterForm.value.logos,
    }
    this.newCharacterForm.reset();
    this.onNext();
  }

  onCardSubmit() {
    this.newCharacter.cards = [];
    var newCard = {
      theme: this.cardForm.value.theme,
      title: this.cardForm.value.title,
      qors: this.cardForm.value.qors,
      ptags: [],
      wtags: []
    }
    console.warn(newCard);
    newCard.ptags.push(this.tagsForm.value);
    console.warn(newCard);
    this.newCharacter.cards.push(newCard);
    console.warn(this.newCharacter);
    this.cardForm.reset();
    this.onNext();
  }

  onNext() {
    this.currentStep++;
  }

  onTest(form) {
    // this.newCharacter.cards = [];
    console.warn('this.newCharacter.cards: ' + this.newCharacter.cards);
    var newCard = {
      theme: this.cardForm.value.theme,
      title: this.cardForm.value.title,
      qors: this.cardForm.value.qors,
      ptags: [],
      wtags: []
    }
    console.warn(newCard);
    var convertedArray = Object.keys(form.value).map(key => ({ key, value: form.value[key] }));
    var filteredArray = convertedArray.filter(element => {
      return element.value !== '';
    });
    if (filteredArray.length > 3) {
     window.alert('Too many power tags!');
     return; 
    }
    console.warn(filteredArray);
    filteredArray.forEach(ptag => {
      newCard.ptags.push({
        letter: ptag.key,
        tag: ptag.value
      });
    });
    if (this.newCharacter.cards === undefined) {
      console.warn('Rewriting this.newCharacter.cards');
      this.newCharacter.cards = [];
      this.newCharacter.cards.push(newCard);
    } else {
      this.newCharacter.cards.push(newCard);
    }
    console.warn(this.newCharacter);
    // this.isLoading = true;
    this.selectedTbType = 'none';
    setTimeout(()=>{
      this.cardForm.reset();
      form.reset();
      // this.checkThemeStatus();
      this.onNext();
    }, 300);
  }

  checkThemeStatus() {
    console.warn('checkThemeStatus event fired');
    console.warn(this.cardForm.value.theme);
    if (this.cardForm.value.theme === '') {
      this.selectedTbType = 'none';
      console.warn(this.selectedTbType);
      return 'blank';
    } else {
      this.selectedTbType = this.getTbData(this.cardForm.value.theme).tbtype;
      console.warn(this.selectedTbType);
      return 'selected';
    }
  }

  capitalize(s) {
    if (typeof s !== 'string') {
      return '';
    } else {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }

  getTbData(tbname) {
    return this.allTbs.find(element => {
      return element.name === tbname;
    })
  }

  ngOnDestroy() {
    this.allTbsSub.unsubscribe();
  }

}