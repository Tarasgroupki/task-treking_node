import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

    //const API_URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  fileUpload(arr:object) {
      return this._http.post('http://localhost:2700/users/file/fileUpload', arr, {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      });
  }
  getRoles(){
      return this._http.get('http://localhost:2700/settings/roles',{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  getCheckedRoles(id: number){
      return this._http.get('http://localhost:2700/users/user/user_has_role/'+id+'',{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  AssignRoles(id: number, arr: object){
      return this._http.post('http://localhost:2700/users/user/user_has_role/'+id+'', arr,{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  getUsers(){
      return this._http.get('http://localhost:2700/users',{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  showUser(id: number){
        return this._http.get('http://localhost:2700/users/'+id+'', {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result);
    }
    showUserProfile(id: number){
        return this._http.get('http://localhost:2700/users/'+id+'', {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result);
    }
  createUser(arr: object) {
      return this._http.post('http://localhost:2700/users', arr, {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
    updateUser(id: number, arr: object) {
        return this._http.put('http://localhost:2700/users/'+id+'', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result).catch(() => {
            return  window.location.href = 'http://localhost:4200/not-found';
        });
    }
    updateProfileUser(id: number, arr: object) {
      return this._http.patch('http://localhost:2700/users/profile/'+id+'', arr, {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
    }
    deleteUser(id: number) {
      return this._http.delete('http://localhost:2700/users/'+id+'',{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
    }
  /*getClients(): Observable<ClientsInterface[]> {
    return this.http.get(this._clientsURL).map((response: Responce) => {
      return <ClientsInterface[]>response.json();
    }).catch(this.handleError);
  }

  private handleError(error: Response) {
      return Observable.throw(error.statusText);
  }
    public getAllClients(): Observable<ClientsInterface[]> {
        return this.http
            .get(this.API_URL)
            .map(response => {
                const todos = response.json();
                return todos.map((todo) => new ClientsInterface(todo));
            })
            .catch(this.handleError);
    }*/

}
