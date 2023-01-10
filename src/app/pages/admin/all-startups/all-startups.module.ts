import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllStartupsRoutingModule } from './all-startups-routing.module';
import { AllStartupsComponent } from './all-startups/all-startups.component';
import { MaterialModule } from 'src/app/lib/components/material/material.module';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllStartupsComponent,DeleteComponent,EditComponent
  ],
  imports: [
    CommonModule,
    AllStartupsRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AllStartupsModule { }
