import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupInfoRoutingModule } from './startup-info-routing.module';
import { StartupInfoComponent } from './startup-info/startup-info.component';
import { MaterialModule } from 'src/app/lib/components/material/material.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StartupInfoComponent
  ],
  imports: [
    CommonModule,
    StartupInfoRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class StartupInfoModule { }
