import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AutomovilUnitePageComponent} from '../pages/automovil-unite-page/automovil-unite-page.component';


const routes: Routes = [
  {
    path: '',
    component: AutomovilUnitePageComponent,
    children: [
      //{path: 'search', component: SearchPageComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomovilUniteRoutingModule {
}
