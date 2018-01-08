import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { PlayerService } from './player.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { environment } from '../environments/environment.prod';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [PlayerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
