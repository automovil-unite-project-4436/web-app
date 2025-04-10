import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AutomovilUnitePageComponent} from '../pages/automovil-unite-page/automovil-unite-page.component';
import {NotificationsPageComponent} from '../pages/notifications-page/notifications-page.component';
import {VehiclesPageComponent} from '../pages/vehicles-page/vehicles-page.component';
import {ReviewsPageComponent} from '../pages/reviews-page/reviews-page.component';
import {ReportsPageComponent} from '../pages/reports-page/reports-page.component';
import {ProfilePageComponent} from '../pages/profile-page/profile-page.component';


const routes: Routes = [
  {
    path: '',
    component: AutomovilUnitePageComponent,
    children: [
      {
        path: 'vehicles', component: VehiclesPageComponent
      },
      {
        path: 'reviews', component: ReviewsPageComponent
      },
      {
        path: 'reports', component: ReportsPageComponent
      },
      {
        path: 'profile', component: ProfilePageComponent
      },
      {
        path: 'notifications', component: NotificationsPageComponent
      },


    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutomovilUniteRoutingModule {
}
