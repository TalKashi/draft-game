import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {
  players;

  constructor(private playerService: PlayerService) {
    
    //this.players.subscribe(players => console.log('players: ', players));
  }

  ngOnInit() {
    //PlayerService.
  }

  search(name: string) {
    
  }

}
