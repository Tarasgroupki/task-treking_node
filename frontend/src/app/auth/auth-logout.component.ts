import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute,RouterModule, Router } from "@angular/router";


@Component({
    selector: 'app-auth-logout',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthLogoutsComponent {
    title = 'app';
    //auth: object;

    constructor(private _auth: AuthService, private route: ActivatedRoute, private router: Router) {
        localStorage.removeItem('token');
        localStorage.removeItem('LoggedIn');
        //sessionStorage.removeItem('token');
        this.router.navigate(['login']);
        //this.route.params.subscribe( params => this._auth.logoutAuth(params['id']).subscribe(res => {

      //  }) );
    }


}
