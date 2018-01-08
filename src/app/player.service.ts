import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class PlayerService {
  players;

  constructor(private db: AngularFireDatabase) { 
    this.players = db.list('players/2018/').valueChanges();
  }

  searchPlayer(name: string) {
    console.log(this.players);
  }
}
