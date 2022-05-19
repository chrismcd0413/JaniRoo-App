import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SchedulesPage } from './schedules.page';
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
            canActivate: [AuthGuard]
          },
          {
            path: 'taskDetail',
            canActivate: [AuthGuard]
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
