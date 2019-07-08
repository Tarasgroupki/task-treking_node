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
        this.route.params.subscribe( params => this._auth.logoutAuth(params['id']).subscribe(res => {
            //this.auth = res['data'];
            localStorage.removeItem('token');
            localStorage.removeItem('LoggedIn');
            //  console.log(res);
            this.router.navigate(['login']);
        }) );
    }


}
