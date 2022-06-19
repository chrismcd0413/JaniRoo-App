import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SchedulesPage } from './schedules.page';
import { ChecklistComponent } from './work/checklist/checklist.component';
import { TaskDetailsComponent } from './work/checklist/task-details/task-details.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  {
    path: '',
    component: SchedulesPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'work',
    children: [
      {
        path: '',
        canActivate: [AuthGuard],
        component: WorkComponent
      },
      {
        path: 'checklist',
        children: [
          {
            path: '',
            canActivate: [AuthGuard],
            component: ChecklistComponent
          },
          {
            path: 'taskDetail',
            canActivate: [AuthGuard],
            component: TaskDetailsComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule {}
