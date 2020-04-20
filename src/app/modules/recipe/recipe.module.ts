import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RecipeDeleteDialogComponent } from './recipe-delete.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeComponent,
  },
];

@NgModule({
  declarations: [RecipeComponent, RecipeDeleteDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class RecipeModule { }
