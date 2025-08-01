import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TouristSpotPageRoutingModule } from './tourist-spot-routing.module';

import { TouristSpotPage } from './tourist-spot.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TouristSpotPageRoutingModule
  ],
  declarations: [TouristSpotPage]
})
export class TouristSpotPageModule {}
