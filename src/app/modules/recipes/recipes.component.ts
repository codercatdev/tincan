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
  private picsCollection: AngularFirestoreCollection<Recipe>;
  pics: Observable<Recipe[]>;

  constructor(private afFirestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.setCollection();
  }
  async setCollection() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.picsCollection = this.afFirestore.collection<Recipe>(`users/${user.uid}/imageUploads/`, ref => ref.orderBy('created', 'desc'));
        this.pics = this.picsCollection.valueChanges();
      }
    });
  }
}
