import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Pic } from 'src/app/models/pic';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styles: [
  ]
})
export class ImageListComponent {
  private picsCollection: AngularFirestoreCollection<Pic>;
  pics: Observable<Pic[]>;

  constructor(private afFirestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.setCollection();
  }
  async setCollection() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.picsCollection = this.afFirestore.collection<Pic>(`users/${user.uid}/imageUploads/`, ref => ref.orderBy('created', 'desc'));
        this.pics = this.picsCollection.valueChanges();
      }
    });
  }
}
