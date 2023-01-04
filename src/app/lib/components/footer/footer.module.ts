import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';




@NgModule({
  declarations: [FooterComponent],
  imports: [CommonModule, MaterialModule, AppRoutingModule],
  exports: [FooterComponent],
})
export class FooterModule {}
