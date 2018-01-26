import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlayerService {
  players : Observable<Player[]>;

  constructor(private db: AngularFireDatabase) { 
    this.players = db.list<Player>('players/2018/').valueChanges();
    this.players.subscribe((players) => console.log('subscribe!. length=', players.length));
  }

  searchPlayer(name: string) {
    if(name.trim().length === 0) {
      return Observable.of([]);
    }
    return this.players.map(players => players.filter(player => player.name.toLowerCase().includes(name.toLowerCase())));
  }
}

export class Player {
  name: string;
  rating: number;
}
