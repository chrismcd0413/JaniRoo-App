import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectionDetailPageRoutingModule } from './inspection-detail-routing.module';

import { InspectionDetailPage } from './inspection-detail.page';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectionDetailPageRoutingModule,
    FlexLayoutModule
  ],
  declarations: [InspectionDetailPage]
})
export class InspectionDetailPageModule {}
