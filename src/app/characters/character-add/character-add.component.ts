import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  newCharacter: Character = {};
  selectedTbType = 'none';

  constructor(
    private admin: AdminService,
    private charactersService: CharactersService,
    private fb: FormBuilder,
    private iconsService: IconsService,
    private router: Router,
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

  onNext() {
    this.currentStep++;
  }

  onTest(form) {
    console.warn(form.value);
    console.warn('this.newCharacter.cards: ' + this.newCharacter.cards);
    var newCard = {
      cardtype: this.getTbData(this.cardForm.value.theme).tbtype,
      theme: this.cardForm.value.theme,
      title: this.cardForm.value.title,
      qors: this.cardForm.value.qors,
      ptags: [],
      wtags: []
    }
    console.warn(newCard);
    var convertedArray = Object.keys(form.value).map(key => ({ key: key.substring(1), value: form.value[key] }));
    var ptagArray = convertedArray.slice(0,9);
    var wtagArray = convertedArray.slice(10,13);
    var ptagFilteredArray = ptagArray.filter(element => {
      return element.value !== '';
    });
    var wtagFilteredArray = wtagArray.filter(element => {
      return element.value !== '';
    });
    if (ptagFilteredArray.length > 3) {
     window.alert('Too many power tags!');
     return; 
    }
    if (wtagFilteredArray.length > 1) {
     window.alert('Too many weakness tags!');
     return; 
    }
    ptagFilteredArray.forEach(ptag => {
      newCard.ptags.push({
        letter: ptag.key,
        tag: ptag.value
      });
    });
    wtagFilteredArray.forEach(wtag => {
      newCard.wtags.push({
        letter: wtag.key,
        tag: wtag.value
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
      if (this.currentStep === 6) {
        this.isLoading = true;
        this.sendCharacter(this.newCharacter);
      }
    }, 300);
  }

  sendCharacter(character) {
    this.charactersService.createCharacter(character);
    setTimeout(()=>{
      this.router.navigate(['characters']);
    }, 500);
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