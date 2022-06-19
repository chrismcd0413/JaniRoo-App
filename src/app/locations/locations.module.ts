import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationsPage } from './locations.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { LocationsRoutingModule } from './locations-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    LocationsRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [LocationsPage]
})
export class LocationsPageModule {}
