import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanResultsPageRoutingModule } from './plan-results-routing.module';

import { PlanResultsPage } from './plan-results.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanResultsPageRoutingModule
  ],
  declarations: [PlanResultsPage]
})
export class PlanResultsPageModule {}
