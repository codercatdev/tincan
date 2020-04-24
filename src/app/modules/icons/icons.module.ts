import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjComponent } from './aj/aj.component';



@NgModule({
  declarations: [AjComponent],
  imports: [
    CommonModule
  ],
  exports: [AjComponent]
})
export class IconsModule { }
