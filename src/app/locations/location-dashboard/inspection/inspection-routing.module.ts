import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { InspectionPage } from './inspection.page';

const routes: Routes = [
  {
    path: '',
    component: InspectionPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'inspection-detail',
    loadChildren: () => import('./inspection-detail/inspection-detail.module').then( m => m.InspectionDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InspectionPageRoutingModule {}
