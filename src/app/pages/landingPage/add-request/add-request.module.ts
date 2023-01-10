import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRequestRoutingModule } from './add-request-routing.module';
import { AddRequestComponent } from './add-request/add-request.component';
import { MaterialModule } from 'src/app/lib/components/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddRequestComponent
  ],
  imports: [
    CommonModule,
    AddRequestRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AddRequestModule { }
