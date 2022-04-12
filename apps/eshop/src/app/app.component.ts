import { Component, OnInit } from '@angular/core';
import { UsersService } from '@lm/users';

@Component({
  selector: 'eshop-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'eshop';

  constructor( private usersService: UsersService ){}

  ngOnInit(){
    this.usersService.initAppSession();
  }
}
