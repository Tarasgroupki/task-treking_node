import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GraphService } from './graph.service';
import { HttpClientModule } from '@angular/common/http';

import { GraphComponent } from './graph.component';


@NgModule({
  declarations: [
    GraphComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GraphService],
  bootstrap: [GraphComponent]
})
export class GraphModule { }
