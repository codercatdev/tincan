import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, map, first } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Pic } from './node_modules/src/app/models/Recipe';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageDeleteDialogComponent, ImageDeleteDialogData } from './image-delete.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styles: [
  ]
})
export class ImageComponent implements OnInit {
  pic: Observable<Pic>;
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
    this.pic = this.route.params.pipe(switchMap((p, i) =>
      this.afAuth.user.pipe(switchMap(auth => {
        this.refString = `/users/${auth.uid}/recipes/${p.id}`;
        return auth ? this.afFirestore.doc<Pic>(this.refString).valueChanges() : null;
      }))));
  }
  delete() {
    const dialogRef = this.dialog.open(ImageDeleteDialogComponent, {
      width: '80%',
      data: { delete: true }
    });

    dialogRef.afterClosed().pipe(first(),map(async (result: ImageDeleteDialogData) => {
      if (result) {
        try{
          await this.afStorage.ref(this.refString).delete();
          await this.afFirestore.doc<Pic>(this.refString).delete();
          this.router.navigate(['/']);
        }catch(err){
          console.log(err);
        }
      }
    })).subscribe();
  }
}
