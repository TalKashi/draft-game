import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { RenameComponent } from './rename/rename.component';
import { PlayerComponent } from './player/player.component';
import { AuthGuard } from './auth.guard';
import { LeagueComponent } from './league/league.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'players/search', component: PlayerSearchComponent },
  { path: 'players/:id', component: PlayerComponent },
  { path: 'changename', component: RenameComponent, canActivate: [AuthGuard] },
  { path: 'league', component: LeagueComponent},
  { path: '**', redirectTo: '/players/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
