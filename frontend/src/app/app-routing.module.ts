import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: 'app/auth/auth.module#AuthModule'
  },
  {
    path: 'clients',
    loadChildren: 'app/clients/clients.module#ClientsModule'
  },
  {
    path: 'leads',
    loadChildren: 'app/leads/leads.module#LeadsModule'
  },
  {
    path: 'settings',
    loadChildren: 'app/settings/settings.module#SettingsModule'
  },
  {
    path: 'sprints',
    loadChildren: 'app/sprints/sprints.module#SprintsModule'
  },
  {
    path: 'tasks',
    loadChildren: 'app/tasks/tasks.module#TasksModule'
  },
  {
    path: 'users',
    loadChildren: 'app/users/users.module#UsersModule'
  },
  {
    path: 'not-found',
    loadChildren: 'app/not-found/not-found.module#NotFoundModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
