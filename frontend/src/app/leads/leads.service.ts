import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LeadsService {

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
  getLeads() {
      return this._http.get('http://localhost:2700/leads', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showLead(id: number) {
      return this._http.get('http://localhost:2700/leads/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result).catch(() => {
          return  window.location.href = 'http://localhost:4200/not-found';
      });
  }
  createLead(parameters: { arr: object }) {
      const arr = parameters.arr;
      return this._http.post('http://localhost:2700/leads', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateLead(id: number, arr: object) {
        return this._http.put('http://localhost:2700/leads/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result); // .catch(() => {
         //   return  window.location.href = 'http://localhost:4200/not-found';
        // });
    }
    deleteLead(id: number) {
      return this._http.delete('http://localhost:2700/leads/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    getUserById(id: number) {
        return this._http.get('http://localhost:2700/users/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    getClientById(id: number) {
        return this._http.get('http://localhost:2700/clients/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
}
