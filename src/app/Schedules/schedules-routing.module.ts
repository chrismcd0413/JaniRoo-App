import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { SchedulesPage } from './schedules.page';


const routes: Routes = [
  {
    path: '',
    component: SchedulesPage,
    canActivate: [AuthGuard]
  },
  {
    path: 'work',
    loadChildren: () => import('../Schedules/work/work.module').then( m => m.WorkPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule {}
