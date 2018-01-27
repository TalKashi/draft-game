import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authState : Observable<any>;

  constructor(private authSevice: AuthService, private router: Router) { }

  ngOnInit() {
    this.authState = this.authSevice.getAuthState();
    this.authState.subscribe(user => console.log(user));
  }

  login() {
    console.log('clicked');
    this.authSevice.login()
    .then(user => {
      // TODO: redirect to give name
      this.router.navigate(['/changename']);
    });
  }

  logout() {
    this.authSevice.logout();
  }

}
