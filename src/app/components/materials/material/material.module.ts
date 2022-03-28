import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips'

@NgModule({
  imports: [CommonModule, MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule, MatPaginatorModule,  MatChipsModule ],
  exports: [ MatInputModule, MatButtonModule, MatProgressSpinnerModule, MatDialogModule, MatPaginatorModule,  MatChipsModule ]
})
export class Material {}
