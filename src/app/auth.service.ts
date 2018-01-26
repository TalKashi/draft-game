import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  

  constructor(private afAuth: AngularFireAuth) {
    // afAuth.authState
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
