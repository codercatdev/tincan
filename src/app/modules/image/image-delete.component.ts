import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ImageDeleteDialogData {
  delete: boolean;
}

@Component({
  selector: 'app-image-delete-dialog',
  template: `
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button color='warn' [mat-dialog-close]="data.delete" cdkFocusInitial>Delete</button>
</div>`
})
export class ImageDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ImageDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImageDeleteDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
