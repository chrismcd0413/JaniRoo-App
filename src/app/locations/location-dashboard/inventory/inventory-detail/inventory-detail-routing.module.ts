import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';

import { InventoryDetailPage } from './inventory-detail.page';

const routes: Routes = [
  {
    path: '',
    component: InventoryDetailPage,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryDetailPageRoutingModule {}
