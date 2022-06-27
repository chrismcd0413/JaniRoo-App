import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InspectionPageRoutingModule } from './inspection-routing.module';

import { InspectionPage } from './inspection.page';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InspectionPageRoutingModule,
    FlexLayoutModule
  ],
  declarations: [InspectionPage]
})
export class InspectionPageModule {}
