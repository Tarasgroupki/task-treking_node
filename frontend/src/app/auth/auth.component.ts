import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Auth } from './auth.model';
import { Router } from '@angular/router';
import {User} from '../users/users.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    title = 'app';
    auth: any = new Auth('', '');
    authenticate: Auth[] = [];
    errMessage = '';
    isLoggedIn: object;
  //  displayedColumns = ['id', 'name', 'email', 'password', 'address', 'work_number', 'personal_number', 'image_path'];

    constructor(private _router: Router, private _auth: AuthService) {
        if(localStorage.getItem('errMessage')) {
            this.errMessage = 'Неправильний логін, або пароль!';
        }
    }

    ngOnInit() {
       // window.location.reload();
        if (localStorage.getItem('LoggedIn')) {
            this._router.navigate(['profile']);
        }
      //  else {
      //      this._router.navigate(['login']);
     //   }
    }
    getAuth() {
        this.authenticate.push(new Auth(this.auth.email, this.auth.password));
        //console.log(this.authenticate);
        this._auth.getAuth(this.authenticate).subscribe(res => {
                this.auth = res;
               // console.log(typeof this.auth);
            if (this.auth) {
                localStorage.setItem('LoggedIn', JSON.stringify(this.auth));
                localStorage.setItem('token', this.auth['token']);
                localStorage.removeItem('errMessage');
                console.log(JSON.parse(localStorage.getItem('LoggedIn')));
                window.location.reload();
            }
            else {
                localStorage.setItem('errMessage', 'true');
                this.authenticate.length = 0;
                this.errMessage = 'Неправильний логін, або пароль!';
                window.location.reload();
            }
           // this._router.navigate(['profile']);
            console.log(this.errMessage);
        });
    }

}
