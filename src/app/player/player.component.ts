import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player;

  constructor(db: AngularFireDatabase) {
    this.player = db.object('players/2018/messi').valueChanges();
    console.log(this.player);
   }

  ngOnInit() {
  }

}
