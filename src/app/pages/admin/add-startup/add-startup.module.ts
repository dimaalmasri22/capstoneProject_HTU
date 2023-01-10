import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddStartupRoutingModule } from './add-startup-routing.module';
import { AddStartupComponent } from './add-startup/add-startup.component';
import { MaterialModule } from 'src/app/lib/components/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddStartupComponent
  ],
  imports: [
    CommonModule,
    AddStartupRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AddStartupModule { }
