import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { PlayerService } from './player.service';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { PlayerSearchComponent } from './player-search/player-search.component';
import { environment } from '../environments/environment.prod';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { RenameComponent } from './rename/rename.component'
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    PlayerSearchComponent,
    LoginComponent,
    RenameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    FormsModule
  ],
  providers: [
    PlayerService, 
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
