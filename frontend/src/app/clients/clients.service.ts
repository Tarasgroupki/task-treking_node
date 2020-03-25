import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ClientsService {

  constructor(private _http: HttpClient) { }

  getUsers() {
      return this._http.get('http://localhost:2700/users', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getClients() {
      return this._http.get('http://localhost:2700/clients', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showClient(id: number) {
      return this._http.get('http://localhost:2700/clients/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result).catch(() => {
          return  window.location.href = 'http://localhost:4200/not-found';
      });
  }
  createClient(arr: object) {
      return this._http.post('http://localhost:2700/clients', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateClient(id: number, arr: object) {
        return this._http.patch('http://localhost:2700/clients/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result); // .catch(() => {
           // return  window.location.href = 'http://localhost:4200/not-found';
      //  });
    }
    deleteClient(id: number) {
      return this._http.delete('http://localhost:2700/clients/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
}
