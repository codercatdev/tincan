import { Component, Inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Recipe, RecipeIngredient, RecipeInstruction } from 'src/app/models/Recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InstructionDialogComponent } from './instruction-dialog/instruction-dialog.component';

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
  recipeIngredientsColumns = ['qty', 'ingredient', 'edit'];
  recipeInstructionsDataSource: MatTableDataSource<RecipeInstruction>;
  recipeInstructionsColumns = ['name', 'text'];

  saving$ = new BehaviorSubject<boolean>(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private afFirestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.recipe = this.route.params.pipe(switchMap((p, i) =>
      this.afAuth.user.pipe(switchMap(auth => {
        this.refString = `/users/${auth.uid}/recipes/${p.id}`;
        if (auth) {
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
      this.recipeRef.collection<RecipeIngredient>('/recipeIngredients').valueChanges().subscribe(recipeIngredients => {
        this.recipeIngredientsDataSource = new MatTableDataSource(recipeIngredients);
      });
      this.recipeRef.collection<RecipeInstruction>('/recipeInstructions').valueChanges().subscribe(recipeInstructions => {
        this.recipeInstructionsDataSource = new MatTableDataSource(recipeInstructions);
      });
      this.recipeForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(async formData => {
        this.saving$.next(false);
        await this.recipeRef.set(formData, {merge: true});
        this.saving$.next(true);
      });
    });
  }

  openIngredientDialog(doc: AngularFirestoreDocument<Recipe>, recipeIngredient?: RecipeIngredient): void {
    const dialogRef = this.dialog.open(IngredientDialogComponent, {
      width: '80%',
      data: {
        doc,
        recipeIngredient
      }
    });
    dialogRef.componentInstance.saving$.subscribe(saving => this.saving$.next(saving));
  }
  openInstructionDialog(doc: AngularFirestoreDocument<Recipe>, recipeInstruction?: RecipeInstruction): void {
    const dialogRef = this.dialog.open(InstructionDialogComponent, {
      width: '80%',
      data: {
        doc,
        recipeInstruction
      }
    });
    dialogRef.componentInstance.saving$.subscribe(saving => this.saving$.next(saving));
  }
}
