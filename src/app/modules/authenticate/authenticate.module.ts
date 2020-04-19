import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateComponent } from './authenticate.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [AuthenticateComponent],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  exports: [
    AuthenticateComponent
  ]
})
export class AuthenticateModule { }
