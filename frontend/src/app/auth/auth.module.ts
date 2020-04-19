import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRouting } from './auth.routing.module';
import { AuthComponent } from './auth.component';
import { AuthLogoutsComponent } from './auth-logout.component';
import { AuthService } from './auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    CommonModule,
    AuthRouting,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [AuthComponent, AuthLogoutsComponent],
  exports: [AuthComponent, AuthLogoutsComponent, ReactiveFormsModule, FormsModule, MaterialModule],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }
