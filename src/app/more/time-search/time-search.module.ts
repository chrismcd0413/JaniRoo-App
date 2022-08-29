import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimeSearchPageRoutingModule } from './time-search-routing.module';

import { TimeSearchPage } from './time-search.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimeSearchPageRoutingModule,
    FlexLayoutModule,
    PipesModule
  ],
  declarations: [TimeSearchPage]
})
export class TimeSearchPageModule {}
