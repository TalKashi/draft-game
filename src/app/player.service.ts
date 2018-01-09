import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlayerService {
  players : Observable<Player[]>;

  constructor(private db: AngularFireDatabase) { 
    this.players = db.list<Player>('players/2018/').valueChanges();
  }

  searchPlayer(name: string) {
    return this.players.map(players => players.filter(player => player.name.includes(name)));
  }
}

export class Player {
  name: string;
  raiting: number;
}
