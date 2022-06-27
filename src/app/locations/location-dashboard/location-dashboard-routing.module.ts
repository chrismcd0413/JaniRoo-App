import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { LocationDashboardPage } from './location-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: LocationDashboardPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'inspection',
    loadChildren: () => import('./inspection/inspection.module').then( m => m.InspectionPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then( m => m.InventoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationDashboardPageRoutingModule {}
