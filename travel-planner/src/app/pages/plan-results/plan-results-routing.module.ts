import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanResultsPage } from './plan-results.page';

const routes: Routes = [
  {
    path: '',
    component: PlanResultsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanResultsPageRoutingModule {}
