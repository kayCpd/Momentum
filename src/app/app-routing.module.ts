import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import {homeGuard} from './guards/home.guard';
import {accountGuard} from './guards/account.guard';
import {AuthDataResolver} from './resolvers/authData.resolver';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // {path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [homeGuard]},
  //{path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [homeGuard]},
    {path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [homeGuard], resolve:{authData: AuthDataResolver} },

  //{path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  // {path: 'account', loadChildren: './account/account.module#AccountPageModule', canActivate: [accountGuard]}
  
  //For Testing without guard
  // {path: 'account', loadChildren: './account/account.module#AccountPageModule', resolve:{authData: AuthDataResolver}}
  
  //uncomment when server is complete/ready
  {path: 'account', loadChildren: './account/account.module#AccountPageModule', canActivate: [accountGuard], resolve:{authData: AuthDataResolver}}

  //{path: 'account', loadChildren: './account/account.module#AccountPageModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
