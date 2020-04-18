import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticateModule } from '../authenticate/authenticate.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireAuthModule } from '@angular/fire/auth/';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    AuthenticateModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    AngularFireAuthModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
