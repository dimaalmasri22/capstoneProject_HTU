import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAQRoutingModule } from './faq-routing.module';
import { FAQComponent } from './faq/faq.component';


@NgModule({
  declarations: [
    FAQComponent
  ],
  imports: [
    CommonModule,
    FAQRoutingModule
  ]
})
export class FAQModule { }
