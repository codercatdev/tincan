import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Recipe } from 'src/app/models/Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeEditCanActivateGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private afFirestore: AngularFirestore){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afAuth.user.pipe(switchMap(auth => {
        if (auth) {
          return this.afFirestore.doc<Recipe>(`/users/${auth.uid}/recipes/${next.params.id}`)
          .valueChanges().pipe(map(r => r ? true : false));
        }
      }));
  }
}
