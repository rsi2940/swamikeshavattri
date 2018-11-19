import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface User {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
  allowWrite?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User>;
  authState: any = null;
  // allowWrite = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // this.afAuth.authState.subscribe(data => (this.authState = data));
    // console.log(this.authState + ' : authService obj created');

    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
    // this.checkAllowWrite();
  }

  checkAllowWrite(): any {
    this.user.forEach(user => {
      // console.log(user.allowWrite);
      if (user) {
        if (user.allowWrite) {
          // this.allowWrite = user.allowWrite;
          // console.log(this.allowWrite);
          return true;
        }
      }
    });
    // await console.log(this.allowWrite);
  }

  login() {
    this.afAuth.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => {
        this.updateUserData(credential.user);
      });
  }
  private updateUserData(user) {
    // Sets user data to firestore on login

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, { merge: true });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/blog');
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uId : null;
  }
}
