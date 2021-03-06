import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SprintsService {

  constructor(private _http: HttpClient) { }

  getUsers() {
      return this._http.get('http://localhost:2700/users', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    getLeads() {
        return this._http.get('http://localhost:2700/leads', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
  getInvoices() {
      return this._http.get('http://task-treking/public/api/invoices').map(result => result);
  }
  getSprints() {
      return this._http.get('http://localhost:2700/sprints', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showSprint(id: number) {
      return this._http.get('http://localhost:2700/sprints/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result).catch(() => {
          return  window.location.href = 'http://localhost:4200/not-found';
      });
  }
  createSprint(arr: object) {
      return this._http.post('http://localhost:2700/sprints', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateSprint(id: number, arr: object) {
        return this._http.patch('http://localhost:2700/sprints/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result).catch(() => {
            return  window.location.href = 'http://localhost:4200/not-found';
        });
    }
    deleteSprint(id: number) {
      return this._http.delete('http://localhost:2700/sprints/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    dailyForecast(id: string) {
        return this._http.get('http://localhost:2700/sprints/get_points/' + id + '')
            .map(result => result);
    }
    getUserById(id: number) {
        return this._http.get('http://localhost:2700/users/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    getLeadById(id: number) {
        return this._http.get('http://localhost:2700/leads/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
}
