import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsComponent } from './settings.component';
import { SettingsCreateComponent } from './settings-create.component';
import { SettingsUpdateComponent } from './settings-update.component';
import { SettingsDeleteComponent } from './settings-delete.component';
import { SettingsRouting } from './settings.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { SettingsService } from './settings.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    SettingsRouting,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [SettingsComponent, SettingsCreateComponent, SettingsUpdateComponent, SettingsDeleteComponent],
  exports: [SettingsComponent, SettingsCreateComponent, SettingsUpdateComponent, SettingsDeleteComponent],
  providers: [SettingsService, AuthGuard]
})
export class SettingsModule { }
