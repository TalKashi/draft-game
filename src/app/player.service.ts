import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlayerService {
  players : Observable<Player[]>;

  constructor(private db: AngularFireDatabase) { 
    this.players = db.list<Player>('players/2018/').valueChanges();
  }

  searchPlayer(name: string) : Observable<Player[]> {
    if(name.trim().length === 0) {
      return Observable.of([]);
    }
    return this.players.map(players => players.filter(player => player.name.toLowerCase().includes(name.toLowerCase())).sort((a, b) => {
      return b.rating - a.rating;
    }));
  }

  getPlayerById(id: string) : Observable<Player> {
    return this.db.object<Player>(`players/2018/${id}`).valueChanges();
  }
}

export class Player {
  name: string;
  rating: number;
  age: number;
  height: number;
  nationality: string;
  position: string;
  teamn: string;
  weight: number;
}
