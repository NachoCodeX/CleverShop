import {
  MatButtonModule, MatToolbarModule,
  MatIconModule, MatSidenavModule,
  MatInputModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [MatSnackBarModule, MatCheckboxModule, MatTableModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatInputModule],
  exports: [MatSnackBarModule, MatCheckboxModule, MatTableModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatInputModule],
})

export class CustomMaterialModule { }