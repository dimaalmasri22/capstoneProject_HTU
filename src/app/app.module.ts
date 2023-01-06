import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './lib/components/material/material.module';

import { environment } from 'src/environments/environment';
import {AngularFireModule}from '@angular/fire/compat'
import{AngularFireAuthModule}from '@angular/fire/compat/auth'
import { AuthRoutingModule } from './pages/auth/auth-routing.module';
import {AngularFirestoreModule}from '@angular/fire/compat/firestore';
import { LayoutsModule } from './layouts/layouts.module';
import { DeleteComponent } from './pages/admin/delete/delete.component';
import { EditComponent } from './pages/admin/edit/edit.component';
import { AddSectorComponent } from './pages/admin/add-sector/add-sector.component';



@NgModule({
  declarations: [AppComponent, DeleteComponent, EditComponent, AddSectorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AuthRoutingModule,
    LayoutsModule,
    AngularFirestoreModule

   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
