import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Player, PlayerService } from '../player.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router/src/shared';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  player: Observable<Player>;

  constructor(private playerService: PlayerService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.player = this.route.paramMap.switchMap((params: ParamMap) => this.playerService.getPlayerById(params.get('id')));
  }

}
