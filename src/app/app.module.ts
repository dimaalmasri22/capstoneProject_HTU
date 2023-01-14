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
import { AddSectorComponent } from './pages/admin/add-sector/add-sector.component';
import {AngularFireStorageModule}from '@angular/fire/compat/storage'


@NgModule({
  declarations: [AppComponent, AddSectorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AuthRoutingModule,
    LayoutsModule,
    AngularFirestoreModule,
    AngularFireStorageModule

   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
