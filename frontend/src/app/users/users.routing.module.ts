import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { UsersComponent } from './users.component';
import { UsersProfileComponent } from './users-profile.component';
import { UsersViewComponent } from './users-view.component';
import { UsersCreateComponent } from './users-create.component';
import { UsersUpdateComponent } from './users-update.component';
import { UsersDeleteComponent } from './users-delete.component';
import { UsersRolesComponent } from './users_roles.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:id',
    component: UsersViewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'user/create',
    component: UsersCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/add/:id',
    component: UsersUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'users/delete/:id',
    component: UsersDeleteComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'users/add_role/:id',
    component: UsersRolesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: UsersProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRouting { }
