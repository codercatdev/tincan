import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface RecipeDeleteDialogData {
  delete: boolean;
}

@Component({
  selector: 'app-recipe-delete-dialog',
  template: `
<div mat-dialog-actions>
  <button mat-button (click)="onNoClick()">No Thanks</button>
  <button mat-button color='warn' [mat-dialog-close]="data.delete" cdkFocusInitial>Delete</button>
</div>`
})
export class RecipeDeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RecipeDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RecipeDeleteDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
