import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeSearchPage } from './time-search.page';

const routes: Routes = [
  {
    path: '',
    component: TimeSearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeSearchPageRoutingModule {}
