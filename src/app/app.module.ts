import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatTableModule,
  MatListModule,
  MatTooltipModule,
  MatDialogModule,
   } from '@angular/material';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlipModule } from 'ngx-flip';
import { 
  CollapseModule,
  CarouselModule,
  ModalModule,
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
import { TextConvertService } from './assets/text-convert.service';
import { CharacterEditComponent } from './characters/character-edit/character-edit.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from "./auth/auth-interceptor";
import { AdminComponent } from './admin/admin/admin.component';
import { ThemebookEditComponent } from './admin/themebooks/themebook-edit/themebook-edit.component';
import { UsersComponent } from './users/users.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { GoBackComponent } from './go-back/go-back.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { NewsAddComponent } from './news/news-add/news-add.component';

@NgModule({  
  imports:      [ 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
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
    MatTableModule,
    MatListModule,
    MatTooltipModule,
    MatDialogModule,
    FontAwesomeModule,
    HttpClientModule,
    FlipModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    NgxUsefulSwiperModule,
    ],
  declarations: [ 
    AppComponent, 
    CharactersComponent, 
    NavbarComponent, 
    CharacterViewComponent, 
    CharacterAddComponent, ThemebooksComponent, ThemebookAddComponent, CharacterEditComponent, FooterComponent, LoginComponent, SignupComponent, AdminComponent, ThemebookEditComponent, UsersComponent, UsersViewComponent, GoBackComponent, HomeComponent, NewsComponent, NewsAddComponent, 
    ],
  bootstrap:    [ AppComponent ],
  providers: [
    CharactersService, 
    IconsService, 
    ReactiveService, 
    AdminService, 
    TextConvertService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ]
})
export class AppModule { }
