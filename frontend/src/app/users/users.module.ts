import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRouting } from './users.routing.module';
import { UsersComponent } from './users.component';
import { UsersProfileComponent } from './users-profile.component';
import { UsersViewComponent } from './users-view.component';
import { UsersCreateComponent } from './users-create.component';
import { UsersUpdateComponent } from './users-update.component';
import { UsersDeleteComponent } from './users-delete.component';
import { UsersRolesComponent } from './users_roles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    UsersRouting,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [UsersComponent, UsersProfileComponent, UsersViewComponent, UsersCreateComponent, UsersUpdateComponent, UsersDeleteComponent, UsersRolesComponent],
  exports: [UsersComponent, UsersProfileComponent, UsersViewComponent, UsersCreateComponent, UsersUpdateComponent, UsersDeleteComponent, UsersRolesComponent],
  providers: [UsersService, AuthGuard]
})
export class UsersModule { }
