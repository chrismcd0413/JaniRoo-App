import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationsPage } from './locations.page';

import { LocationsRoutingModule } from './locations-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminSchedulesViewModule } from '../shared-components/admin-schedules-view/admin-schedules-view.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LocationsRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AdminSchedulesViewModule,
    PipesModule
  ],
  declarations: [LocationsPage]
})
export class LocationsPageModule {}
