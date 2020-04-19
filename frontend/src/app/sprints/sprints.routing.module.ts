import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { SprintsComponent } from './sprints.component';
import { SprintsViewComponent } from './sprints-view.component';
import { SprintsCreateComponent } from './sprints-create.component';
import { SprintsUpdateComponent } from './sprints-update.component';
import { SprintsDeleteComponent } from './sprints-delete.component';

const routes: Routes = [
  {
    path: 'sprints',
    component: SprintsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sprints/:id',
    component: SprintsViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sprint/create',
    component: SprintsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sprints/add/:id',
    component: SprintsUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sprints/delete/:id',
    component: SprintsDeleteComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SprintsRouting { }
