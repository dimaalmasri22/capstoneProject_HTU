import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStartupsRoutingModule } from './all-startups-routing.module';
import { AllStartupsComponent } from './all-startups/all-startups.component';


@NgModule({
  declarations: [
    AllStartupsComponent
  ],
  imports: [
    CommonModule,
    AllStartupsRoutingModule
  ]
})
export class AllStartupsModule { }
