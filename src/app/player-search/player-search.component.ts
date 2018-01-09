import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { PlayerService } from '../player.service';
import { Subject } from 'rxjs/Subject';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.component.html',
  styleUrls: ['./player-search.component.css']
})
export class PlayerSearchComponent implements OnInit {
  players;
  playerToSearch = new Subject<string>();

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.players = this.playerToSearch.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => this.playerService.searchPlayer(term))      
    );
  }

  search(name: string) {
    this.playerToSearch.next(name);
  }

}
