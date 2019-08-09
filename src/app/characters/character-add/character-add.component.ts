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
  newCard;
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

  onSubmit(form) {
    console.warn('Submitted form value:');
    console.warn(form.value);
    this.newCard = {
      cardtype: this.getTbData(this.cardForm.value.theme).tbtype,
      theme: this.cardForm.value.theme,
      title: this.cardForm.value.title,
      qors: this.cardForm.value.qors,
      ptags: [],
      wtags: []
    }
    console.warn(this.newCard);
    var convertedArray = Object.keys(form.value).map(key => ({ key: key.substring(1), value: form.value[key] }));
    var ptagArray = convertedArray.slice(0,9);
    console.warn(ptagArray);
    var wtagArray = convertedArray.slice(10,13);
    console.warn(ptagArray);
    var processPromise = new Promise ((resolve, reject) => {
      this.processTags(ptagArray, wtagArray);
      setTimeout(() =>{
        resolve();
      }, 300);
    });
    processPromise.then((result) => {
      if (this.newCharacter.cards === undefined) {
        console.warn('Rewriting this.newCharacter.cards');
        this.newCharacter.cards = [];
        this.newCharacter.cards.push(this.newCard);
      } else {
        this.newCharacter.cards.push(this.newCard);
      }
      console.warn(this.newCharacter);
      this.selectedTbType = 'none';
      setTimeout(()=>{
        this.cardForm.reset();
        form.reset();
        this.onNext();
        if (this.currentStep === 6) {
          this.isLoading = true;
          this.sendCharacter(this.newCharacter);
        }
      }, 300);
    });
  }

  processTags(ptagArray, wtagArray) {
    var filterP = new Promise((resolve, reject) => {
      var ptagFilteredArray = ptagArray.filter(element => {
        return element.value !== '';
      });
      setTimeout(() => {
        if (ptagFilteredArray.length < 5) {
          resolve(ptagFilteredArray);
        } else {
          reject();
        }
      }, 100);
    });
    var filterW = new Promise((resolve, reject) => {
      var wtagFilteredArray = wtagArray.filter(element => {
        return element.value !== '';
      });
      setTimeout(() => {
        if (wtagFilteredArray.length < 3) {
          resolve(wtagFilteredArray);
        } else {
          reject();
        }
      }, 100);
    });
    Promise.all([filterP, filterW]).then((values) => {
      var ptags = values[0];
      var wtags = values[1];
      ptags.forEach(ptag => {
      this.newCard.ptags.push({
        letter: ptag.key,
        tag: ptag.value
      });
    });
    wtags.forEach(wtag => {
      this.newCard.wtags.push({
        letter: wtag.key,
        tag: wtag.value
      });
    });
    })
  }

  sendCharacter(character) {
    this.charactersService.createCharacter(character);
    setTimeout(()=>{
      this.router.navigate(['characters']);
    }, 1000);
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