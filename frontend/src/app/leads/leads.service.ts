import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LeadsService {

    //const API_URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  /*getRole(token: object) {
      return this._http.post('http://task_treking.ua/public/api/roles', token, {
          headers: new HttpHeaders().set('Accept', 'application/json')
      }).map(result => result);
  }*/
  getUsers(){
      return this._http.get('http://localhost:2700/users',{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
    getClients(){
        return this._http.get('http://localhost:2700/clients', {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result);
    }
  getLeads(){
      return this._http.get('http://localhost:2700/leads', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  showLead(id: number){
      return this._http.get('http://localhost:2700/leads/'+id+'',{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result).catch(() => {
          return  window.location.href = 'http://localhost:4200/not-found';
      });
  }
  createLead(parameters: { arr: object }){
      let arr = parameters.arr;
      return this._http.post('http://localhost:2700/leads', arr,{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
    updateLead(id: number,arr: object){
        return this._http.put('http://localhost:2700/leads/'+id+'', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result);//.catch(() => {
         //   return  window.location.href = 'http://localhost:4200/not-found';
        //});
    }
    deleteLead(id:number){
      return this._http.delete('http://localhost:2700/leads/'+id+'',{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
    }
    getUserById(id: number) {
        return this._http.get('http://localhost:2700/users/'+id+'', {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result);
    }
    getClientById(id: number) {
        return this._http.get('http://localhost:2700/clients/'+id+'', {
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
