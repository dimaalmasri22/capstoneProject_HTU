import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStartupComponent } from './add-startup/add-startup.component';

const routes: Routes = [{path:'',component:AddStartupComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddStartupRoutingModule { }
