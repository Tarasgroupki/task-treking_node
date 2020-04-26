import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRouting } from './tasks.routing.module';
import { TasksComponent } from './tasks.component';
import { TasksViewComponent } from './tasks-view.component';
import { TasksCreateComponent } from './tasks-create.component';
import { TasksUpdateComponent } from './tasks-update.component';
import { TasksDeleteComponent } from './tasks-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material.module';
import { TasksService } from './tasks.service';
import { AuthGuard } from '../auth/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    TasksRouting,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  declarations: [TasksComponent, TasksViewComponent, TasksCreateComponent, TasksUpdateComponent, TasksDeleteComponent],
  exports: [TasksComponent, TasksViewComponent, TasksCreateComponent, TasksUpdateComponent, TasksDeleteComponent],
  providers: [TasksService, AuthGuard]
})
export class TasksModule { }
