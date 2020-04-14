import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Auth } from './auth.model';
import { Router } from '@angular/router';

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

    constructor(private router: Router, private authService: AuthService) {
        if (localStorage.getItem('errMessage')) {
            this.errMessage = 'Неправильний логін, або пароль!';
        }
    }

    ngOnInit() {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['profile']);
        }
    }

    getAuth() {
        this.authenticate.push(new Auth(this.auth.email, this.auth.password));

        this.authService.getAuth(this.authenticate).subscribe(resAuth => {
              this.auth = resAuth;
              this.authService.currentUser.next(this.auth['user']);
              this.authService.permissions.next(this.auth['permissions']);
                localStorage.setItem('LoggedIn', JSON.stringify(this.auth));
                localStorage.setItem('token', this.auth['token']);
                localStorage.removeItem('errMessage');
                console.log(JSON.parse(localStorage.getItem('LoggedIn')));
              this.router.navigate(['clients']);
            console.log(this.errMessage);
        }, (err) => {
          localStorage.setItem('errMessage', 'true');
          this.authenticate.length = 0;
          this.errMessage = 'Неправильний логін, або пароль!';
        });
    }

}
