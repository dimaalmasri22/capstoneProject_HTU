import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './adminLayout/admin.component';
import { EndUserComponent } from './endUserLayout/end-user.component';
import { FooterModule } from '../lib/components/footer/footer.module';
import { HeaderModule } from '../lib/components/header/header.module';
import { AppRoutingModule } from '../app-routing.module';
import { MaterialModule } from '../lib/components/material/material.module';
import { SpinnerModule } from '../lib/components/spinner/spinner.module';




@NgModule({
  declarations: [AdminComponent, EndUserComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    FooterModule,
    HeaderModule,
    MaterialModule,
    SpinnerModule
  ],
})
export class LayoutsModule {}
