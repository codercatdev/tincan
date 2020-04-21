import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Recipe } from 'src/app/models/Recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styles: [
  ]
})
export class RecipesComponent {
  private recipesCollection: AngularFirestoreCollection<Recipe>;
  recipes: Observable<Recipe[]>;

  constructor(private afFirestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.setCollection();
  }
  async setCollection() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.recipesCollection = this.afFirestore.collection<Recipe>(`users/${user.uid}/imageUploads/`, ref =>
        ref.orderBy('created', 'desc'));
        this.recipes = this.recipesCollection.valueChanges();
      }
    });
  }
}
