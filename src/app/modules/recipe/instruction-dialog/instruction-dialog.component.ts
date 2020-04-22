import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeIngredient, Recipe, RecipeInstruction } from 'src/app/models/Recipe';

@Component({
  selector: 'app-instruction-dialog',
  templateUrl: './instruction-dialog.component.html',
  styles: [
  ]
})
export class InstructionDialogComponent {
  @Output()
  saving$ = new EventEmitter();
  recipeInstruction: RecipeInstruction;

  constructor(
    public dialogRef: MatDialogRef<InstructionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      recipeInstruction: RecipeInstruction;
      doc: AngularFirestoreDocument<Recipe>
    }) {
      if(data.recipeInstruction){
        this.recipeInstruction = data.recipeInstruction;
      }else{
        this.recipeInstruction = {
          name: null,
          text: null
        }
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async addInstruction(){
    this.saving$.next(false);
    await this.data.doc.ref.collection('/recipeInstructions').add(this.recipeInstruction);
    this.saving$.next(true);
    this.dialogRef.close();
  }

  async editInstruction(){
    this.saving$.next(false);
    await this.data.doc.ref.collection('/recipeInstructions').doc(this.recipeInstruction.id).set(this.recipeInstruction);
    this.saving$.next(true);
    this.dialogRef.close();
  }

}
