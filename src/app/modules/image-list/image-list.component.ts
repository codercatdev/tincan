import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styles: [
  ]
})
export class ImageListComponent {
  private picsCollection: AngularFirestoreCollection<Photo>;
  pics: Observable<Photo[]>;

  constructor(private afFirestore: AngularFirestore, private afAuth: AngularFireAuth) {
    this.setCollection();
  }
  async setCollection() {
    this.afAuth.user.subscribe(user => {
      if (user) {
        this.picsCollection = this.afFirestore.collection<Photo>(`users/${user.uid}/imageUploads/`, ref => ref.orderBy('created'));
        this.pics = this.picsCollection.valueChanges();
      }
    });
  }
}

interface Photo {
  url: string;
}
