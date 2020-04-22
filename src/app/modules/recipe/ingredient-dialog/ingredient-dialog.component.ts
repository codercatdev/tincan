import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeIngredient, Recipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styles: [
  ]
})
export class IngredientDialogComponent {
  @Output()
  saving$ = new EventEmitter();
  recipeIngredient: RecipeIngredient;

  constructor(
    public dialogRef: MatDialogRef<IngredientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      recipeIngredient: RecipeIngredient;
      doc: AngularFirestoreDocument<Recipe>
    }) {
      if(data.recipeIngredient){
        this.recipeIngredient = data.recipeIngredient;
      }else{
        this.recipeIngredient = {
          qty: null,
          ingredient: null
        }
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async addIngredient() {
    this.saving$.next(false);
    await this.data.doc.ref.collection('/recipeIngredients').add(this.recipeIngredient);
    this.saving$.next(true);
    this.dialogRef.close();
  }

  async editIngredient() {
    this.saving$.next(false);
    await this.data.doc.ref.collection('/recipeIngredients').doc(this.recipeIngredient.id).set(this.recipeIngredient);
    this.saving$.next(true);
    this.dialogRef.close();
  }

}
