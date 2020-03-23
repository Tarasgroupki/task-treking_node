import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

    // const API_URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

    /*getClients(){
        return this._http.get('http://task_treking.ua/public/api/index').map(result => result);
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
