import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { CharactersComponent } from './characters/characters.component'
import { CharacterViewComponent } from './characters/character-view/character-view.component';
import { CharacterEditComponent } from './characters/character-edit/character-edit.component';
import { CharacterAddComponent } from './characters/character-add/character-add.component';
import { ThemebooksComponent } from './admin/themebooks/themebooks.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ThemebookAddComponent } from './admin/themebooks/themebook-add/themebook-add.component';
import { ThemebookEditComponent } from './admin/themebooks/themebook-edit/themebook-edit.component';
import { LoginComponent } from "./auth/login/login.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { AuthGuard } from "./auth/auth.guard";
import { AdminGuard } from "./admin/admin.guard";

const appRoutes: Routes = [
  { 
    path: 'characters', 
    component: CharactersComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'characters/create',
    pathMatch: 'full',
    component: CharacterAddComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'characters/:id',
    pathMatch: 'full',
    component: CharacterViewComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'characters/:id/edit',
    pathMatch: 'full',
    component: CharacterEditComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'themebooks', 
    component: ThemebooksComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'themebooks/add', 
    component: ThemebookAddComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'themebooks/edit', 
    component: ThemebookEditComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: "login", 
    component: LoginComponent 
  },
  { 
    path: "signup", 
    component: LoginComponent 
  },
  { 
    path: "admin", 
    component: AdminComponent,
    canActivate: [AdminGuard]
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