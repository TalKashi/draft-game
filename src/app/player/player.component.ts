import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Player } from '../player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player: Observable<Player>;

  constructor(db: AngularFireDatabase) {
    this.player = db.object<Player>('players/2018/messi').valueChanges();
  }

  ngOnInit() {
  }

}
