import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsService } from './clients/clients.service';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {ClientsViewComponent} from './clients/clients-view.component';
import {ClientsCreateComponent} from './clients/clients-create.component';
import {ClientsUpdateComponent} from './clients/clients-update.component';
import {ClientsDeleteComponent} from './clients/clients-delete.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksService } from './tasks/tasks.service';
import {TasksViewComponent} from './tasks/tasks-view.component';
import { TasksCreateComponent } from './tasks/tasks-create.component';
import { TasksUpdateComponent } from './tasks/tasks-update.component';
import { TasksDeleteComponent } from './tasks/tasks-delete.component';
import { LeadsComponent } from './leads/leads.component';
import { LeadsService } from './leads/leads.service';
import {LeadsViewComponent} from './leads/leads-view.component';
import { LeadsCreateComponent } from './leads/leads-create.component';
import { LeadsUpdateComponent } from './leads/leads-update.component';
import { LeadsDeleteComponent } from './leads/leads-delete.component';
import { UsersService } from './users/users.service';
import { UsersComponent } from './users/users.component';
import {UsersViewComponent} from './users/users-view.component';
import { UsersCreateComponent } from './users/users-create.component';
import { UsersUpdateComponent } from './users/users-update.component';
import { UsersDeleteComponent } from './users/users-delete.component';
import { SprintsComponent } from './sprints/sprints.component';
import {SprintsViewComponent} from './sprints/sprints-view.component';
import { SprintsCreateComponent } from './sprints/sprints-create.component';
import { SprintsUpdateComponent } from './sprints/sprints-update.component';
import { SprintsDeleteComponent } from './sprints/sprints-delete.component';
import { AuthService } from './auth/auth.service';
import { AuthComponent } from './auth/auth.component';
import { SettingsService } from './settings/settings.service';
import { SettingsComponent } from './settings/settings.component';
import { SettingsCreateComponent } from './settings/settings-create.component';
import { UsersRolesComponent } from './users/users_roles.component';
import { SettingsUpdateComponent } from './settings/settings-update.component';
import { SettingsDeleteComponent } from './settings/settings-delete.component';
import { AuthLogoutsComponent } from './auth/auth-logout.component';
import { UsersProfileComponent } from './users/users-profile.component';
import {GraphComponent} from './graph/graph.component';
import {GraphService} from './graph/graph.service';
import {SprintsService} from './sprints/sprints.service';
import {NotFoundComponent} from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientsViewComponent,
    ClientsCreateComponent,
    ClientsUpdateComponent,
    ClientsDeleteComponent,
    TasksComponent,
    TasksViewComponent,
    TasksCreateComponent,
    TasksUpdateComponent,
    TasksDeleteComponent,
    LeadsComponent,
    LeadsViewComponent,
    LeadsCreateComponent,
    LeadsUpdateComponent,
    LeadsDeleteComponent,
    UsersComponent,
    UsersViewComponent,
    UsersCreateComponent,
    UsersUpdateComponent,
    UsersDeleteComponent,
    UsersRolesComponent,
    SprintsComponent,
    SprintsViewComponent,
    SprintsCreateComponent,
    SprintsUpdateComponent,
    SprintsDeleteComponent,
    UsersRolesComponent,
    AuthComponent,
    SettingsComponent,
    SettingsCreateComponent,
    SettingsUpdateComponent,
    SettingsDeleteComponent,
    AuthLogoutsComponent,
    UsersProfileComponent,
    GraphComponent,
    NotFoundComponent
      ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
        {
            path: 'clients',
            component: ClientsComponent
        },
        {
            path: 'clients/create',
            component: ClientsCreateComponent
        },
        {
            path: 'clients/:id',
            component: ClientsViewComponent
        },
        {
            path: 'clients/add/:id',
            component: ClientsUpdateComponent
        },
        {
            path: 'clients/delete/:id',
            component: ClientsDeleteComponent
        },
        {
            path: 'tasks',
            component: TasksComponent
        },
        {
            path: 'tasks/:id',
            component: TasksViewComponent
        },
        {
            path: 'task/create',
            component: TasksCreateComponent
        },

        {
            path: 'tasks/add/:id',
            component: TasksUpdateComponent
        },
        {
            path: 'tasks/delete/:id',
            component: TasksDeleteComponent
        },
        {
            path: 'leads',
            component: LeadsComponent
        },
        {
            path: 'leads/:id',
            component: LeadsViewComponent
        },
        {
            path: 'lead/create',
            component: LeadsCreateComponent
        },
        {
            path: 'leads/add/:id',
            component: LeadsUpdateComponent
        },
        {
            path: 'leads/delete/:id',
            component: LeadsDeleteComponent
        },
        {
            path: 'users',
            component: UsersComponent
        },
        {
            path: 'users/:id',
            component: UsersViewComponent
        },
        {
            path: 'user/create',
            component: UsersCreateComponent
        },
        {
            path: 'users/add/:id',
            component: UsersUpdateComponent
        },
        {
            path: 'users/delete/:id',
            component: UsersDeleteComponent
        },

        {
            path: 'users/add_role/:id',
            component: UsersRolesComponent
        },
        {
            path: 'login',
            component: AuthComponent
        },
        {
            path: 'roles',
            component: SettingsComponent
        },
        {
            path: 'role/create',
            component: SettingsCreateComponent
        },
        {
            path: 'roles/add/:id',
            component: SettingsUpdateComponent
        },
        {
            path: 'roles/delete/:id',
            component: SettingsDeleteComponent
        },
        {
            path: 'logout/:id',
            component: AuthLogoutsComponent
        },
        {
            path: 'profile',
            component: UsersProfileComponent
        },
        {
            path: 'graph',
            component: GraphComponent
        },
        {
            path: 'sprints',
            component: SprintsComponent
        },
        {
            path: 'sprints/:id',
            component: SprintsViewComponent
        },
        {
            path: 'sprint/create',
            component: SprintsCreateComponent
        },
        {
            path: 'sprints/add/:id',
            component: SprintsUpdateComponent
        },
        {
            path: 'sprints/delete/:id',
            component: SprintsDeleteComponent
        },
        {
            path: '**',
            component: NotFoundComponent
        }
    ]),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  //  AppRoutingModule
  ],
  providers: [ApiService, ClientsService, TasksService, LeadsService, UsersService, AuthService, SettingsService, GraphService, SprintsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
