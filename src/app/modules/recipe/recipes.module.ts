import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RecipeDeleteDialogComponent } from './recipe-delete.component';
import { RecipeEditComponent } from './recipe-edit.component';
import { RecipesComponent } from './recipes.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
  },
  {
    path: ':id',
    component: RecipeComponent,
  },
  {
    path: ':id/edit',
    component: RecipeEditComponent,
  },
];

@NgModule({
  declarations: [RecipesComponent, RecipeComponent, RecipeDeleteDialogComponent, RecipeEditComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
  ]
})
export class RecipeModule { }
