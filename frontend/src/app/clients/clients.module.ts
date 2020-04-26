import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsRouting } from './clients.routing.module';
import { ClientsComponent } from './clients.component';
import { ClientsViewComponent } from './clients-view.component';
import { ClientsCreateComponent } from './clients-create.component';
import { ClientsUpdateComponent } from './clients-update.component';
import { ClientsDeleteComponent } from './clients-delete.component';
import { ClientsService } from './clients.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    ClientsRouting,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [ClientsComponent, ClientsViewComponent, ClientsCreateComponent, ClientsUpdateComponent, ClientsDeleteComponent],
  exports: [ClientsComponent, ClientsViewComponent, ClientsCreateComponent, ClientsUpdateComponent, ClientsDeleteComponent],
  providers: [ClientsService, AuthGuard]
})
export class ClientsModule { }
