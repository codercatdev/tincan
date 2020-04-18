import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera.component';
import { WebcamModule } from 'ngx-webcam';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

const routes: Routes = [
  {
    path: '',
    component: CameraComponent,
  },
];

@NgModule({
  declarations: [CameraComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    WebcamModule,
    MatButtonModule,
    AngularFireStorageModule,
    AngularFireAuthModule
  ]
})
export class CameraModule { }
