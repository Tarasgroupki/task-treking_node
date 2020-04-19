import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadsRouting } from './leads.routing.module';
import { LeadsComponent } from './leads.component';
import { LeadsViewComponent } from './leads-view.component';
import { LeadsCreateComponent } from './leads-create.component';
import { LeadsUpdateComponent } from './leads-update.component';
import { LeadsDeleteComponent } from './leads-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { LeadsService } from './leads.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    LeadsRouting,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [LeadsComponent, LeadsViewComponent, LeadsCreateComponent, LeadsUpdateComponent, LeadsDeleteComponent],
  exports: [LeadsComponent, LeadsViewComponent, LeadsCreateComponent, LeadsUpdateComponent, LeadsDeleteComponent],
  providers: [LeadsService, AuthGuard]
})
export class LeadsModule { }
