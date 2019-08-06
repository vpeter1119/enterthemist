import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { CharactersComponent } from './characters/characters.component'
import { CharacterViewComponent } from './characters/character-view/character-view.component';
import { CharacterAddComponent } from './characters/character-add/character-add.component';
import { ThemebooksComponent } from './admin/themebooks/themebooks.component';

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
    component: CharacterViewComponent
  },
  { 
    path: 'themebooks', 
    component: ThemebooksComponent
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
  ]
})

export class AppRoutingModule {}