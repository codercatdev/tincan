import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styles: [
  ]
})
export class AuthenticateComponent  {

  constructor(public afAuth: AngularFireAuth) {
    afAuth.user.subscribe(u => console.log(u));
  }
  login() {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.signOut();
  }
}
