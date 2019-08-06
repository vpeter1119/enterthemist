import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { 
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatGridListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
   } from '@angular/material';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { FlipModule } from 'ngx-flip';
import { 
  CollapseModule,
  CarouselModule  
  } from 'ngx-bootstrap';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CharacterViewComponent } from './characters/character-view/character-view.component';
import { CharactersService } from './characters/characters.service';
import { IconsService } from './assets/icons.service';
import { ReactiveService } from './reactive.service';
import { CharacterAddComponent } from './characters/character-add/character-add.component';
import { ThemebooksComponent } from './admin/themebooks/themebooks.component';
import { AdminService } from './admin/admin.service';
import { ThemebookAddComponent } from './admin/themebooks/themebook-add/themebook-add.component';

@NgModule({  
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FontAwesomeModule,
    HttpClientModule,
    FlipModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    NgxUsefulSwiperModule,
    ],
  declarations: [ 
    AppComponent, 
    CharactersComponent, 
    NavbarComponent, 
    CharacterViewComponent, 
    CharacterAddComponent, ThemebooksComponent, ThemebookAddComponent, 
    ],
  bootstrap:    [ AppComponent ],
  providers: [CharactersService, IconsService, ReactiveService, AdminService]
})
export class AppModule { }
