import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddSectorRoutingModule } from './add-sector-routing.module';
import { AddSectorComponent } from './add-sector/add-sector.component';


@NgModule({
  declarations: [
    AddSectorComponent
  ],
  imports: [
    CommonModule,
    AddSectorRoutingModule
  ]
})
export class AddSectorModule { }
