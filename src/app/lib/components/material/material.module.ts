import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {  MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

const material = [
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatIconModule,
  MatSidenavModule,
  ReactiveFormsModule,
  MatDialogModule,
  MatSelectModule,
  MatCheckboxModule,
];


@NgModule({
  declarations: [],
  imports: [CommonModule, material],
  exports: [material]
})
export class MaterialModule {}
