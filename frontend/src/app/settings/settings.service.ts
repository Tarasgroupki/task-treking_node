import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SettingsService {

  constructor(private _http: HttpClient) { }

  getPermissions() {
      return this._http.get('http://localhost:2700/settings/permissions', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getOnePermission(id: number) {
      return this._http.get('http://localhost:2700/settings/role_has_permission/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getRoles() {
      return this._http.get('http://localhost:2700/settings/roles', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showRole(id: number) {
      return this._http.get('http://localhost:2700/settings/roles/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  createRole(arr: object) {
      return this._http.post('http://localhost:2700/settings/roles', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    createRole_has_perm(arr: object) {
        return this._http.post('http://localhost:2700/settings/role_has_permission', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    updateRole(id: string, arr: object) {
        return this._http.patch('http://localhost:2700/settings/roles/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    deleteRole(id: number) {
      return this._http.delete('http://localhost:2700/settings/roles/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    getRoleByName(name: string) {
        return this._http.get('http://localhost:2700/settings/role/' + name + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
}
