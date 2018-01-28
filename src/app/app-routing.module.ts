import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { RenameComponent } from './rename/rename.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'players/search', component: PlayerSearchComponent },
  { path: 'players/:id', component: PlayerComponent },
  { path: 'changename', component: RenameComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', redirectTo: 'players/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
