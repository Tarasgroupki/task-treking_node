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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import {AuthGuard} from './auth/auth.guard';


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
        },
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
            path: 'login',
            component: AuthComponent
        },
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
            canActivate: [AuthGuard]
        },
        {
            path: 'roles/delete/:id',
            component: SettingsDeleteComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'logout/:id',
            component: AuthLogoutsComponent
        },
        {
            path: 'profile',
            component: UsersProfileComponent,
            canActivate: [AuthGuard]
        },
        {
            path: 'graph',
            component: GraphComponent,
            canActivate: [AuthGuard]
        },
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
        {
            path: '**',
            component: NotFoundComponent
        }
    ]),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [ApiService, ClientsService, TasksService, LeadsService, UsersService, AuthService, SettingsService, GraphService, SprintsService, AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
