import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  

  constructor(private afAuth: AngularFireAuth) {
  }

  getAuthState() {
    return this.afAuth.authState;
  }

  getCurrentUser() {
    return this.afAuth.auth.currentUser;
  }

  login() {
    return this.afAuth.auth.signInAnonymously();
  }

  logout() {
    return this.afAuth.auth.signOut();
  }
}
