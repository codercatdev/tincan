import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'recipes',
    loadChildren: () => import('./modules/recipe/recipes.module').then(m => m.RecipeModule),
  },
  { path: '', redirectTo: 'recipes', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
