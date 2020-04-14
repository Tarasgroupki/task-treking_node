import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  currentUser = new BehaviorSubject(null);
  permissions = new BehaviorSubject(null);

  constructor(private _http: HttpClient) { }

    getAuth(arr: object) {
        return this._http.post('http://localhost:2700/users/login', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
            })
        }).map(result => result);
    }

    logoutAuth(id: number) {
       return this._http.get('http://localhost:8080/public/api/users/logout/' + id + '').map(result => result);
    }

    isAuthenticated(): boolean {
      const token = localStorage.getItem('token');

      return !!token;
    }

}
