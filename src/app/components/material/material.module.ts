import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon'



@NgModule({
  imports: [CommonModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule, MatIconModule ],
  exports: [ MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule, MatIconModule ]
})
export class MaterialModule { }
