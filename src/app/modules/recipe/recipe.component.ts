import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Recipe } from 'src/app/models/Recipe';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: [
  ]
})
export class RecipeComponent implements OnInit {
  recipe: Observable<Recipe>;
  refString: string;
  constructor(
    private route: ActivatedRoute,
    private afFirestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.recipe = this.route.params.pipe(switchMap((p, i) =>
      this.afAuth.user.pipe(switchMap(auth => {
        this.refString = `/users/${auth.uid}/recipes/${p.id}`;
        return auth ? this.afFirestore.doc<Recipe>(this.refString).valueChanges() : null;
      }))));
  }
}
