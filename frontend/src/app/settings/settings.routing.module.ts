import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { SettingsComponent } from './settings.component';
import { SettingsCreateComponent } from './settings-create.component';
import { SettingsUpdateComponent } from './settings-update.component';
import { SettingsDeleteComponent } from './settings-delete.component';


const routes: Routes = [
  {
    path: 'roles',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'role/create',
    component: SettingsCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'roles/add/:id',
    component: SettingsUpdateComponent,
  //  canActivate: [AuthGuard]
  },
  {
    path: 'roles/delete/:id',
    component: SettingsDeleteComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRouting { }
