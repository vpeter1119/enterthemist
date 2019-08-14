import { Component, OnInit, OnDestroy, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Character } from './character.model';
import { CharactersService } from './characters.service';
import { IconsService } from '../assets/icons.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit, OnDestroy {

  isLoading = false;
  isAdmin =false;
  noCharacters: boolean;
  icons;
  allCharactersSub: Subscription;
  characters: Character[];

  modalRef: BsModalRef;
  isConfirmed: boolean;
  toDeleteId: string;
  toDeleteName: string;

  constructor(
    private router: Router,
    private charactersService: CharactersService,
    private iconsService: IconsService,
    private modalService: BsModalService,
    private _auth: AuthService,
  ) {
    this.icons = this.iconsService.getIcons();
    this.isAdmin = this._auth.getIsAdmin();
   }

  ngOnInit() {
    this.isLoading = true;
    this.allCharactersSub = this.charactersService.getAllListener()
    .subscribe(allCharacters => {
      if (allCharacters.length < 1) {
        this.noCharacters = true;
      } else {
        this.noCharacters = false;
      }
      this.characters = allCharacters;
      this.isLoading = false;
    })
  }

  onView(charid) {
    this.router.navigate(['characters/' + charid]);
  }

  onEdit(charid) {
    this.router.navigate(['characters/' + charid + '/edit']);
  }

  onDelete(charid) {
    this.charactersService.deleteCharacter(charid);
    this.isLoading;
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }

  onAddCharacter() {
    this.router.navigate(['characters/create']);
  }

  ngOnDestroy() {
    this.allCharactersSub.unsubscribe();
  }

//Bootstrap confirmation modal

  openModal(template: TemplateRef<any>, charid: string, charName: string) {
    this.toDeleteId = charid;
    this.toDeleteName = charName;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.onDelete(this.toDeleteId);
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }

}