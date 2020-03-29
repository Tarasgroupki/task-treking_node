import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    title = 'app';
    users: object;
    displayedColumns = ['id', 'name', 'email', 'password', 'address', 'work_number', 'personal_number', 'image_path'];

    constructor(private usersService: UsersService) {}

    ngOnInit() {
        this.usersService.getUsers().subscribe(resUsers => {
            this.users = resUsers;
        });
    }

}
