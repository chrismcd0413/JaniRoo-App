import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulesPage } from './schedules.page';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SchedulesRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    PipesModule
  ],
  declarations: [SchedulesPage]
})
export class SchedulesModule {}
