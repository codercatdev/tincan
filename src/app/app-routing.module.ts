import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/image-list/image-list.module').then(m => m.ImageListModule),
  },
  {
    path: 'add',
    loadChildren: () => import('./modules/camera/camera.module').then(m => m.CameraModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
