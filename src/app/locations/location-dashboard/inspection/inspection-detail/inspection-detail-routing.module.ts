import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { InspectionDetailPage } from './inspection-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionDetailPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionDetailPageRoutingModule {}
