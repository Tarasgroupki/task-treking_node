import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
    selector: 'app-auth-logout',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthLogoutsComponent {
    title = 'app';

    constructor(private _auth: AuthService, private route: ActivatedRoute, private router: Router) {
        localStorage.removeItem('token');
        localStorage.removeItem('LoggedIn');
        this.router.navigate(['login']);
    }


}
