import { Component, OnInit, OnDestroy, TemplateRef  } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { Character } from '../../characters/character.model';
import { AdminService } from '../admin.service';
import { CharactersService } from '../../characters/characters.service';
import { IconsService } from '../../assets/icons.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  isLoading = false;
  noCharacters: boolean;
  icons;
  allCharactersSub: Subscription;
  characters: Character[];
  activeCharacters: Character[] = [];
  deletedCharacters: Character[] = [];
  users;
  allUsersSub: Subscription;

  modalRef: BsModalRef;
  isConfirmed: boolean;
  toDeleteId: string;
  toDeleteName: string;

  constructor(
    private router: Router,
    private admin: AdminService,
    private charactersService: CharactersService,
    private iconsService: IconsService,
    private modalService: BsModalService,
  ) {
    this.icons = this.iconsService.getIcons();
   }

  ngOnInit() {
    this.isLoading = true;
    this.allUsersSub = this.admin.getAllUsers()
    .subscribe((usersList) => {
      this.users = usersList;
    })
    this.allCharactersSub = this.admin.getAllChars()
    .subscribe(allCharacters => {
      if (allCharacters === []) {
        this.noCharacters = true;
      } else {
        this.noCharacters = false;
      }
      this.characters = allCharacters;
      this.deletedCharacters = [];
      this.activeCharacters = [];
      this.characters.forEach(character => {
        if (character.deleted) {
          this.deletedCharacters.push(character);
        } else {
          this.activeCharacters.push(character);
        }
      });
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

  onRestore(charid) {
    this.charactersService.restoreCharacter(charid);
    this.isLoading;
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }

  finalDelete(charid) {
    this.admin.finalDelete(charid);
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