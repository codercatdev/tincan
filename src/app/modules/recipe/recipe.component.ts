import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Recipe } from 'src/app/models/Recipe';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipeDeleteDialogData, RecipeDeleteDialogComponent } from './recipe-delete.component';
import { AngularFireStorage } from '@angular/fire/storage';

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
    private router: Router,
    private afFirestore: AngularFirestore,
    private afStorage: AngularFireStorage,
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
  delete() {
    const dialogRef = this.dialog.open(RecipeDeleteDialogComponent, {
      width: '80%',
      data: { delete: true }
    });

    dialogRef.afterClosed().pipe(first(),map(async (result: RecipeDeleteDialogData) => {
      if (result) {
        try{
          await this.afStorage.ref(this.refString).delete();
          await this.afFirestore.doc<Recipe>(this.refString).delete();
          this.router.navigate(['/']);
        }catch(err){
          console.log(err);
        }
      }
    })).subscribe();
  }
}
