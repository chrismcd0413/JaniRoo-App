import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChecklistPage } from './checklist.page';

const routes: Routes = [
  {
    path: '',
    component: ChecklistPage
  },
  {
    path: 'task-details',
    loadChildren: () => import('../../../Schedules/work/checklist/task-details/task-details.module').then( m => m.TaskDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChecklistPageRoutingModule {}
