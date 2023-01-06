import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAQRoutingModule } from './faq-routing.module';
import { FAQComponent } from './faq/faq.component';
import { MaterialModule } from 'src/app/lib/components/material/material.module';


@NgModule({
  declarations: [
    FAQComponent
  ],
  imports: [
    CommonModule,
    FAQRoutingModule,
    MaterialModule
  ]
})
export class FAQModule { }
