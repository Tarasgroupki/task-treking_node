import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

  constructor(private _http: HttpClient) { }

  fileUpload(arr: object) {
      return this._http.post('http://localhost:2700/users/file/fileUpload', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      });
  }
  getRoles() {
      return this._http.get('http://localhost:2700/settings/roles', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getCheckedRoles(id: number) {
      return this._http.get('http://localhost:2700/users/user/user_has_role/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  AssignRoles(id: number, arr: object) {
      return this._http.post('http://localhost:2700/users/user/user_has_role/' + id + '', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  getUsers() {
      return this._http.get('http://localhost:2700/users', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
  showUser(id: number) {
        return this._http.get('http://localhost:2700/users/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
    showUserProfile(id: number) {
        return this._http.get('http://localhost:2700/users/' + id + '', {
            headers: new HttpHeaders({'Accept': 'application/json'})
        }).map(result => result);
    }
  createUser(arr: object) {
      return this._http.post('http://localhost:2700/users', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
  }
    updateUser(id: number, arr: object) {
        return this._http.put('http://localhost:2700/users/' + id + '', arr, {
            headers: new HttpHeaders({'Accept': 'application/json' })
        }).map(result => result).catch(() => {
            return  window.location.href = 'http://localhost:4200/not-found';
        });
    }
    updateProfileUser(id: number, arr: object) {
      return this._http.patch('http://localhost:2700/users/profile/' + id + '', arr, {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
    deleteUser(id: number) {
      return this._http.delete('http://localhost:2700/users/' + id + '', {
          headers: new HttpHeaders({'Accept': 'application/json'})
      }).map(result => result);
    }
}
