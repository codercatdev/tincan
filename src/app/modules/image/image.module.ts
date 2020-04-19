import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageComponent } from './image.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ImageDeleteDialogComponent } from './image-delete.component';

const routes: Routes = [
  {
    path: '',
    component: ImageComponent,
  },
];

@NgModule({
  declarations: [ImageComponent, ImageDeleteDialogComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class ImageModule { }
