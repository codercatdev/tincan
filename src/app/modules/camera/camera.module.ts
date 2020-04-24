import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraComponent } from './camera.component';
import { WebcamModule } from 'ngx-webcam';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [CameraComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    WebcamModule,
    MatButtonModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    MatProgressBarModule
  ],
  exports: [CameraComponent],
})
export class CameraModule { }
