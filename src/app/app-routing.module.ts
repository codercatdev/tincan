import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'add',
    loadChildren: () => import('./modules/camera/camera.module').then(m => m.CameraModule),
  },
  {
    path: '',
    loadChildren: () => import('./modules/recipe/recipes.module').then(m => m.RecipeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
