import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { TasksComponent } from './tasks.component';
import { TasksViewComponent } from './tasks-view.component';
import { TasksCreateComponent } from './tasks-create.component';
import { TasksUpdateComponent } from './tasks-update.component';
import { TasksDeleteComponent } from './tasks-delete.component';

const routes: Routes = [

  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/:id',
    component: TasksViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'task/create',
    component: TasksCreateComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'tasks/add/:id',
    component: TasksUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks/delete/:id',
    component: TasksDeleteComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRouting { }
