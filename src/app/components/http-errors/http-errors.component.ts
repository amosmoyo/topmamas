import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-http-errors',
  templateUrl: './http-errors.component.html',
  styleUrls: ['./http-errors.component.css']
})
export class HttpErrorsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private ref: MatDialogRef<HttpErrorsComponent>
  ) {
    console.log(data);
  }

  close(): void {
    this.ref.close();
  }

}
