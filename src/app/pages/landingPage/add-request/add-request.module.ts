import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRequestRoutingModule } from './add-request-routing.module';
import { AddRequestComponent } from './add-request/add-request.component';


@NgModule({
  declarations: [
    AddRequestComponent
  ],
  imports: [
    CommonModule,
    AddRequestRoutingModule
  ]
})
export class AddRequestModule { }
