import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStartupsRoutingModule } from './all-startups-routing.module';
import { AllStartupsComponent } from './all-startups/all-startups.component';
import { MaterialModule } from 'src/app/lib/components/material/material.module';


@NgModule({
  declarations: [
    AllStartupsComponent
  ],
  imports: [
    CommonModule,
    AllStartupsRoutingModule,
    MaterialModule
  ]
})
export class AllStartupsModule { }
