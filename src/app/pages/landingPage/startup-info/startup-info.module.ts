import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupInfoRoutingModule } from './startup-info-routing.module';
import { StartupInfoComponent } from './startup-info/startup-info.component';


@NgModule({
  declarations: [
    StartupInfoComponent
  ],
  imports: [
    CommonModule,
    StartupInfoRoutingModule
  ]
})
export class StartupInfoModule { }
