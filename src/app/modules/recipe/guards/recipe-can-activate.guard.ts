import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeCanActivateGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private afFirestore: AngularFirestore,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afAuth.user.pipe(switchMap(async auth => {
        if (auth) {
          const doc = await this.afFirestore.collection(`/users/${auth.uid}/recipes/`).add({id: 'na'});
          return this.router.parseUrl(`/recipes/${doc.id}/edit`);
        }
      }));
    }
}
