import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './users.model';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersViewComponent {
    title = 'app';
    user: User = new User('', '', '', '', '', '', '');
    id: number;

    constructor(private usersService: UsersService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this.usersService.showUser(params['id']).subscribe(resUser => {
            this.user = new User(resUser['name'], resUser['email'], resUser['password'], resUser['address'], resUser['work_number'], resUser['personal_number'], resUser['image_path']);
            this.id = params['id'];
        }) );
    }
}
