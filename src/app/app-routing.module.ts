import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/adminLayout/admin.component';
import { EndUserComponent } from './layouts/endUserLayout/end-user.component';
import { AuthGuard } from './lib/guards/auth.guard';
import { NotloggedinGuard } from './lib/guards/notloggedin.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: EndUserComponent, children:[
    {path:'',loadChildren:()=>import('./pages/landingPage/home/home.module').then((m)=>m.HomeModule)},
    {path:'about',loadChildren:()=>import('./pages/landingPage/about/about.module').then((m)=>m.AboutModule)},
    {path:'FAQ',loadChildren:()=>import('./pages/landingPage/faq/faq.module').then((m)=>m.FAQModule)},
    {path:'auth',loadChildren:()=>import('./pages/auth/auth.module').then((m)=>m.AuthModule)}
  ] },
  {path:'admin',component:AdminComponent,children:[
    {path:'',loadChildren:()=>import('./pages/admin/all-startups/all-startups.module').then((m)=>m.AllStartupsModule)},
    {path:'startupForm',loadChildren:()=>import('./pages/admin/add-startup/add-startup.module').then((m)=>m.AddStartupModule)},
    {path:'sectorForm',loadChildren:()=>import('./pages/admin/add-sector/add-sector.module').then((m)=>m.AddSectorModule)},
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
