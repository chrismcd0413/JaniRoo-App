import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocationDashboardPageRoutingModule } from './location-dashboard-routing.module';

import { LocationDashboardPage } from './location-dashboard.page';
import { AdminSchedulesViewModule } from 'src/app/shared-components/admin-schedules-view/admin-schedules-view.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocationDashboardPageRoutingModule,
    AdminSchedulesViewModule,
    FlexLayoutModule
  ],
  declarations: [LocationDashboardPage]
})
export class LocationDashboardPageModule {}
