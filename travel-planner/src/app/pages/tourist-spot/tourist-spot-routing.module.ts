import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TouristSpotPage } from './tourist-spot.page';

const routes: Routes = [
  {
    path: '',
    component: TouristSpotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TouristSpotPageRoutingModule {}
