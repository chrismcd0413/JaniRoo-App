import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulesPage } from './schedules.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SchedulesRoutingModule } from './schedules-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WorkComponent } from './work/work.component';
import { ChecklistComponent } from './work/checklist/checklist.component';
import { TaskDetailsComponent } from './work/checklist/task-details/task-details.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    SchedulesRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  declarations: [SchedulesPage, WorkComponent, ChecklistComponent, TaskDetailsComponent]
})
export class SchedulesModule {}
