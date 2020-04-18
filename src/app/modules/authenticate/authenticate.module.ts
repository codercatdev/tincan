import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticateComponent } from './authenticate.component';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth';

const routes: Routes = [
  {
    path: '',
    component: AuthenticateComponent,
  },
];

@NgModule({
  declarations: [AuthenticateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularFireAuthModule
  ]
})
export class AuthenticateModule { }
