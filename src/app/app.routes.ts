import { Routes } from '@angular/router';
import {isNotAuthenticatedGuard} from './auth/guards/is-not-authenticated.guard';
import {isAuthenticatedGuard} from './auth/guards/is-authenticated.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [isNotAuthenticatedGuard],
    loadChildren: () => import('./auth/routing/auth.routes').then(m => m.AuthRoutingModule),
  },
  {
    path: 'automovil-unite',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import('./automovil-unite/routing/automovil-unite.routes').then(m => m.AutomovilUniteRoutingModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
];
