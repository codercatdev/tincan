import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, RecipeIngredient, RecipeInstruction } from 'src/app/models/Recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface RecipeDeleteDialogData {
  delete: boolean;
}

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: [
    `.mat-form-field {
      font-size: 14px;
      width: 100%;
    }
    .mat-table {
      overflow: auto;
      max-height: 750px;
      border: 1px black;
    }`
  ]
})
export class RecipeEditComponent {
  recipe: Observable<Recipe>;
  refString: string;
  recipeRef: AngularFirestoreDocument<Recipe>;

  recipeForm: FormGroup;
  recipeIngredientsDataSource: MatTableDataSource<RecipeIngredient>;
  recipeIngredientsColumns = ['qty', 'ingredient'];
  recipeInstructionsDataSource: MatTableDataSource<RecipeInstruction>;
  recipeInstructionsColumns = ['name', 'text'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afFirestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder
  ) {
    this.recipe = this.route.params.pipe(switchMap((p, i) =>
      this.afAuth.user.pipe(switchMap(auth => {
        this.refString = `/users/${auth.uid}/imageUploads/${p.id}`;
        if(auth){
          this.recipeRef = this.afFirestore.doc<Recipe>(this.refString);
          return this.recipeRef.valueChanges();
        }
      }))));

    this.recipe.subscribe(r => {
      this.recipeForm = this.fb.group({
        id: [r?.id],
        cookTime: [r?.cookTime],
        description: [r?.description],
        keywords: [r?.keywords],
        name: [r?.name],
        prepTime: [r?.prepTime],
        recipeCategory: [r?.recipeCategory],
        recipeCuisine: [r?.recipeCuisine]
      });
      this.recipeIngredientsDataSource = new MatTableDataSource(r.recipeIngredients);
      this.recipeInstructionsDataSource = new MatTableDataSource(r.recipeInstructions);
    });
  }
}
