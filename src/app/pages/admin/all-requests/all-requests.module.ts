import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRequestsRoutingModule } from './all-requests-routing.module';
import { RequestsComponent } from './requests/requests.component';
import { MaterialModule } from 'src/app/lib/components/material/material.module';
import { FormsModule } from '@angular/forms';
import { DeleteRequestComponent } from './delete-request/delete-request.component';
import { AddRequestsComponent } from './add-requests/add-requests.component';


@NgModule({
  declarations: [
    RequestsComponent,
    DeleteRequestComponent,
    AddRequestsComponent
  ],
  imports: [
    CommonModule,
    AllRequestsRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AllRequestsModule { }
