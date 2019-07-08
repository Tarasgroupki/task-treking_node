import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

    //const API_URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

    getAuth(arr: object){
        return this._http.post('http://localhost:2700/users/login', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
            //    'X-Content-Type-Options': 'nosniff',
            //    'Content-Type': 'text/plain',
            })
        }).map(result => result);
    }
    logoutAuth(id: number) {
       return this._http.get('http://task-treking/public/api/users/logout/'+id+'').map(result => result);
    }

}
