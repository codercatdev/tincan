import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageListComponent } from './image-list.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: ImageListComponent,
  },
];

@NgModule({
  declarations: [ImageListComponent],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FlexLayoutModule
  ],
  exports: [ImageListComponent]
})
export class ImageListModule { }
