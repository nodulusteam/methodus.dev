import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule, } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule],
  exports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatSelectModule]
})

export class AngularMaterialModule { }
