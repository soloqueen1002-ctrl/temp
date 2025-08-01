import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodOrderPageRoutingModule } from './food-order-routing.module';

import { FoodOrderPage } from './food-order.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodOrderPageRoutingModule
  ],
  declarations: [FoodOrderPage]
})
export class FoodOrderPageModule {}
