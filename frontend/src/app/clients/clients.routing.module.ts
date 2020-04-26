import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ClientsComponent} from './clients.component';
import {AuthGuard} from '../auth/auth.guard';
import {ClientsCreateComponent} from './clients-create.component';
import {ClientsViewComponent} from './clients-view.component';
import {ClientsUpdateComponent} from './clients-update.component';
import {ClientsDeleteComponent} from './clients-delete.component';


const routes: Routes = [
  {
    path: 'clients',
    component: ClientsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients/create',
    component: ClientsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients/:id',
    component: ClientsViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients/add/:id',
    component: ClientsUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'clients/delete/:id',
    component: ClientsDeleteComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRouting { }
