import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'schedule',
        loadChildren: () => import('../Schedules/schedules.module').then(m => m.SchedulesModule)
      },
      {
        path: 'locations',
        loadChildren: () => import('../locations/locations.module').then(m => m.LocationsPageModule)
      },
      {
        path: 'inbox',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },,
      {
        path: 'more',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/schedule',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
