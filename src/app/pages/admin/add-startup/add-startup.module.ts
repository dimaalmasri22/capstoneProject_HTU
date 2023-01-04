import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStartupRoutingModule } from './add-startup-routing.module';
import { AddStartupComponent } from './add-startup/add-startup.component';


@NgModule({
  declarations: [
    AddStartupComponent
  ],
  imports: [
    CommonModule,
    AddStartupRoutingModule
  ]
})
export class AddStartupModule { }
