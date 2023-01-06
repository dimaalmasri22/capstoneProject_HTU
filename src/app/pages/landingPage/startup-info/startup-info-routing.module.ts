import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupInfoComponent } from './startup-info/startup-info.component';

const routes: Routes = [
  {
    path: '',component:StartupInfoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupInfoRoutingModule { }
