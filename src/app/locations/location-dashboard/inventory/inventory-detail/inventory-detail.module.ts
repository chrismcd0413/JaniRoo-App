import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryDetailPageRoutingModule } from './inventory-detail-routing.module';

import { InventoryDetailPage } from './inventory-detail.page';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryDetailPageRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [InventoryDetailPage]
})
export class InventoryDetailPageModule {}
