import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminSchedulesViewComponent } from './admin-schedules-view.component';
import { IonicModule } from '@ionic/angular';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [AdminSchedulesViewComponent],
  imports: [
    CommonModule,
    IonicModule,
    FlexLayoutModule
  ],
  exports: [AdminSchedulesViewComponent]
})
export class AdminSchedulesViewModule { }
