import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

import { Character } from "../character.model";
import { Themebook } from "../../admin/themebooks/themebook.model";
import { CharactersService } from "../characters.service";
import { AdminService } from "../../admin/admin.service";
import { IconsService } from "../../assets/icons.service";
import { TextConvertService } from "../../assets/text-convert.service";
import { ReactiveService } from "../../reactive.service";
import { GoBackComponent } from "../../go-back/go-back.component";

export class TbResponse {
  m: Themebook[];
  l: Themebook[];
}

@Component({
  selector: "app-character-view",
  templateUrl: "./character-view.component.html",
  styleUrls: ["./character-view.component.css"]
})
export class CharacterViewComponent implements OnInit, OnDestroy {
  isLoading = false;
  icons;
  objectKeys = Object.keys;
  data;
  mobile: boolean;
  windowWidth;
  flippedIndex = [false, false, false, false];
  burned: false;

  requestedCharacterSub: Subscription;
  character: Character;
  themebooksSub: Subscription;
  mythosTbs: Themebook[];
  logosTbs: Themebook[];
  themebooks: Themebook[];
  cards = [];

  swiperConfig = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: index => {
        return '<span class="swiper-pagination-bullet" style="height: 20px; width: 20px; margin: 1rem 10px;"></span>';
      }
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    spaceBetween: 30
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private iconsService: IconsService,
    private reactive: ReactiveService,
    public _text: TextConvertService,
    public _admin: AdminService,
    public dialog: MatDialog
  ) {
    this.icons = this.iconsService.getIcons();
  }

  ngOnInit() {
    this.isLoading = true;
    this.windowWidth = window.screen.width;
    this.mobile = true;
    this.mobile = this.reactive.isMobile();
    this.themebooks = [];
    const id = this.route.snapshot.paramMap.get("id");
    this.themebooksSub = this._admin
      .getAllTbs()
      .subscribe((response: TbResponse) => {
        this.mythosTbs = response.m;
        this.logosTbs = response.l;
        this.mythosTbs.forEach(mtb => {
          this.themebooks.push(mtb);
        });
        this.logosTbs.forEach(ltb => {
          this.themebooks.push(ltb);
        });
      });
    this.requestedCharacterSub = this.charactersService
      .getOneListener(id)
      .subscribe(character => {
        this.character = character[0];
        this.data = character[0];
        this.cards = character[0].cards;
        this.isLoading = false;
      });
  }

  onFlip(nr) {
    this.flippedIndex[nr] = !this.flippedIndex[nr];
  }

  onAddCard() {
    window.alert("Trying to add a new card, eh? Be patient...");
  }

  onEditCard(nr) {
    window.alert("You are trying to edit card nr. " + (nr + 1) + ".");
  }

  onDeleteCard(nr) {
    this.character.cards.splice(nr, 1);
    this.character.cards.push(this.charactersService.getEmptyCard());
    //Should also send PATCH/DELETE request to server.
  }

  burnTag(cardNr, type: string, i) {
    console.warn(this.character.cards[cardNr][type][i].tag);
  }

  getValues(obj) {
    var rawValues = Object.values(obj);
    return rawValues.join("");
  }

  getCardType(obj) {
    return Object.values(obj).join("");
  }

  getTbData(name) {
    return this.themebooks.find(tb => {
      return tb.name === name;
    });
  }

  onBackToCharacters() {
    this.router.navigate(["characters"]);
  }

  ngOnDestroy() {
    this.requestedCharacterSub.unsubscribe();
    this.themebooksSub.unsubscribe();
  }
}
