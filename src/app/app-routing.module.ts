import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { CharactersComponent } from './characters/characters.component'
import { CharacterViewComponent } from './characters/character-view/character-view.component';
import { CharacterEditComponent } from './characters/character-edit/character-edit.component';
import { CharacterAddComponent } from './characters/character-add/character-add.component';
import { ThemebooksComponent } from './admin/themebooks/themebooks.component';
import { ThemebookAddComponent } from './admin/themebooks/themebook-add/themebook-add.component';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes: Routes = [
  { 
    path: 'characters', 
    component: CharactersComponent 
  },
  { 
    path: 'characters/create',
    pathMatch: 'full',
    component: CharacterAddComponent
  },
  { 
    path: 'characters/:id',
    pathMatch: 'full',
    component: CharacterViewComponent
  },
  { 
    path: 'characters/:id/edit',
    pathMatch: 'full',
    component: CharacterEditComponent
  },
  { 
    path: 'themebooks', 
    component: ThemebooksComponent
  },
  { 
    path: 'themebooks/add', 
    component: ThemebookAddComponent
  },
  { 
    path: "login", 
    component: LoginComponent 
  },
  { 
    path: "signup", 
    component: SignupComponent 
  },
  { 
    path: '', 
    redirectTo: '/characters', 
    pathMatch: 'full' 
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    AuthGuard
  ]
})

export class AppRoutingModule {}