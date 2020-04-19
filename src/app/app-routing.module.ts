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
  {
    path: ':id',
    loadChildren: () => import('./modules/image/image.module').then(m => m.ImageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
