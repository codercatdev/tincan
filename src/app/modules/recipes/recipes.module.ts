import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
  },
];

@NgModule({
  declarations: [RecipesComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
  exports: [RecipesComponent]
})
export class RecipestModule { }
