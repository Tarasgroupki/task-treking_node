import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './users.model';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersCreateComponent implements OnInit {
    user: any = new User('', '', '', '', '', '', '');
    users: User[] = [];

    constructor(public usersService: UsersService) {

    }

    addUser() {
        this.users.push(new User(this.user.name, this.user.email, this.user.password, null , null, null, null));
        console.log(this.users);
        this.usersService.createUser(this.users).subscribe(resUser => {
        this.user = resUser;
        this.users.length = 0;
    });
    }
    ngOnInit() {

    }

}
