import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './layouts/adminLayout/admin.component';
import { EndUserComponent } from './layouts/endUserLayout/end-user.component';
import { SpinnerComponent } from './lib/components/spinner/spinner.component';
import { AuthGuard } from './lib/guards/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditComponent } from './pages/admin/all-startups/edit/edit.component';


const routes: Routes = [
  {
    path: '',
    component: EndUserComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/landingPage/home/home.module').then(
            (m) => m.HomeModule
          ),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./pages/landingPage/about/about.module').then(
            (m) => m.AboutModule
          ),
      },
      {
        path: 'FAQ',
        loadChildren: () =>
          import('./pages/landingPage/faq/faq.module').then((m) => m.FAQModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'addRequest',
        loadChildren: () =>
          import('./pages/landingPage/add-request/add-request.module').then(
            (m) => m.AddRequestModule
          ),
      },
      {
        path: 'startupInfo/:id',
        loadChildren: () =>
          import('./pages/landingPage/startup-info/startup-info.module').then(
            (m) => m.StartupInfoModule
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/admin/all-startups/all-startups.module').then(
            (m) => m.AllStartupsModule
          ),
      },
      {
        path: 'startupForm',
        loadChildren: () =>
          import('./pages/admin/add-startup/add-startup.module').then(
            (m) => m.AddStartupModule
          ),
      },
      {
        path: 'Requests',
        loadChildren: () =>
          import('./pages/admin/all-requests/all-requests.module').then(
            (m) => m.AllRequestsModule
          ),
      },
      { path: 'edit/:id', component: EditComponent },
    ],
    canActivate: [AuthGuard],
  },
  {path:'spinner',component: SpinnerComponent},
  {path:"**",component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
