import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-users-delete',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersDeleteComponent {
    title = 'app';
    user: object;

    constructor(private usersService: UsersService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe( params => this.usersService.deleteUser(params['id']).subscribe(resUser => {
            this.user = resUser;
            this.router.navigate(['users']);
        }) );
    }

}
