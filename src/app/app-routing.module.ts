import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/recipes/recipes.module').then(m => m.RecipestModule),
  },
  {
    path: 'add',
    loadChildren: () => import('./modules/camera/camera.module').then(m => m.CameraModule),
  },
  {
    path: ':id',
    loadChildren: () => import('./modules/recipe/recipe.module').then(m => m.RecipeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
