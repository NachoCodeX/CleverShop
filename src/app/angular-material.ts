import {
  MatButtonModule, MatToolbarModule,
  MatIconModule, MatSidenavModule,
  MatInputModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
@NgModule({
  imports: [MatProgressSpinnerModule, MatProgressBarModule, MatSelectModule, MatSnackBarModule, MatCheckboxModule, MatTableModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatInputModule],
  exports: [MatProgressSpinnerModule, MatProgressBarModule, MatSelectModule, MatSnackBarModule, MatCheckboxModule, MatTableModule, MatButtonModule, MatToolbarModule, MatIconModule, MatSidenavModule, MatInputModule],
})

export class CustomMaterialModule { }