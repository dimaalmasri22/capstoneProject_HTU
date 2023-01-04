import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './adminLayout/admin.component';
import { EndUserComponent } from './endUserLayout/end-user.component';
import { FooterModule } from '../lib/components/footer/footer.module';
import { HeaderModule } from '../lib/components/header/header.module';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [AdminComponent, EndUserComponent],
  imports: [CommonModule, FooterModule, HeaderModule, AppRoutingModule],
})
export class LayoutsModule {}
