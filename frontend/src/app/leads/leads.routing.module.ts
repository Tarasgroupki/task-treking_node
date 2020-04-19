import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadsComponent } from './leads.component';
import { LeadsViewComponent } from './leads-view.component';
import { LeadsCreateComponent } from './leads-create.component';
import { LeadsUpdateComponent } from './leads-update.component';
import { LeadsDeleteComponent } from './leads-delete.component';
import { AuthGuard } from '../auth/auth.guard';


const routes: Routes = [
  {
    path: 'leads',
    component: LeadsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leads/:id',
    component: LeadsViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'lead/create',
    component: LeadsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leads/add/:id',
    component: LeadsUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leads/delete/:id',
    component: LeadsDeleteComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRouting { }
