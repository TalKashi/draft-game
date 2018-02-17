import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, } from 'rxjs/Observable';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { auth } from 'firebase/app';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  leagues: Observable<League[]>;

  constructor(private db: AngularFireDatabase, private auth: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.leagues = this.db.list<League>('leagues').valueChanges();
  }

  createLeague() {
    this.auth.getCurrentUser().getIdToken()
      .then(token => {
        console.log(`Got token: ${token}`);
        this.http.get('https://us-central1-league-9a9ec.cloudfunctions.net/api/league/create', {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
        }).subscribe(data => console.log('Data: ', data));
          // .pipe(
          // tap(id => console.log(`Created league id is ${id}`)),
          // catchError(err => {
          //   console.error('Error:', err);
          //   return of(null);
          // }));
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }

  joinLeague(id: string) {
    console.log(`joining league ${id}`);
    // const user = {};
    // user[this.auth.getCurrentUser().uid] = true;    
    // this.db.object(`leagues/${id}/users`).set(user);

    this.auth.getCurrentUser().getIdToken()
      .then(token => {
        console.log(`Got token: ${token}`);
        this.http.get(`https://us-central1-league-9a9ec.cloudfunctions.net/api/league/${id}/join`, {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
        }).subscribe(data => console.log('Data: ', data));
          // .pipe(
          // tap(id => console.log(`Created league id is ${id}`)),
          // catchError(err => {
          //   console.error('Error:', err);
          //   return of(null);
          // }));
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }

  leaveLeague(id: string) {
    console.log(`leaving league ${id}`);
    this.auth.getCurrentUser().getIdToken()
      .then(token => {
        console.log(`Got token: ${token}`);
        this.http.get(`https://us-central1-league-9a9ec.cloudfunctions.net/api/league/${id}/leave`, {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
        }).subscribe(data => console.log('Data: ', data));
          // .pipe(
          // tap(id => console.log(`Created league id is ${id}`)),
          // catchError(err => {
          //   console.error('Error:', err);
          //   return of(null);
          // }));
      })
      .catch(err => {
        console.error('Error:', err);
      });
  }

}

export class League {
  name: string;
  createdBy: string;
  state: string;
  users: string[];
  id: string;
}
