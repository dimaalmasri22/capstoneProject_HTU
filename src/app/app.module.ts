import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './lib/components/material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { environment } from 'src/environments/environment';
import {AngularFireModule}from '@angular/fire/compat'
import{AngularFireAuthModule}from '@angular/fire/compat/auth'
import { AuthModule } from './pages/auth/auth.module';
import { AuthRoutingModule } from './pages/auth/auth-routing.module';

import { LayoutsModule } from './layouts/layouts.module';



@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AuthRoutingModule,
    LayoutsModule,

   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
