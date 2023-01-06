import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllStartupsComponent } from './all-startups/all-startups.component';

const routes: Routes = [
  {path:'',component:AllStartupsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllStartupsRoutingModule { }
