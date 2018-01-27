import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';

@Component({
  selector: 'app-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.css']
})
export class RenameComponent implements OnInit {
  user : AngularFireObject<User>;
  name: string;

  constructor(private db: AngularFireDatabase, private auth: AuthService) { }

  ngOnInit() {
    console.log('current user='+this.auth.getCurrentUser());
    this.auth.getAuthState().subscribe(user => {
      console.log('### user=', user);
      if(!user) return;

      this.user = this.db.object<User>(`/users/${user.uid}`);
      this.user.valueChanges().subscribe(user => {
        console.log('name is: ' + user.name);
        this.name = user.name;
      })
    })
    
  }

  onSubmit() {
    console.log(`submit name=${this.name}`);
    if(this.name.trim().length === 0) {
      // TODO: notify user
      return console.log('Name must not be empty');
    }

    this.user.update({name: this.name})
      .then(() => console.log('success!'))
      .catch(err => console.log('Error: ', err));
  }

}

class User {
  name: string;
}
