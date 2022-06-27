import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistPageRoutingModule } from './checklist-routing.module';

import { ChecklistPage } from './checklist.page';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecklistPageRoutingModule,
    FlexLayoutModule,
    PipesModule
  ],
  declarations: [ChecklistPage]
})
export class ChecklistPageModule {}
