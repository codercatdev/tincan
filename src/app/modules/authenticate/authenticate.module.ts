import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateComponent } from './authenticate.component';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [AuthenticateComponent],
  imports: [
    CommonModule,
    AngularFireAuthModule
  ],
  exports: [
    AuthenticateComponent
  ]
})
export class AuthenticateModule { }
