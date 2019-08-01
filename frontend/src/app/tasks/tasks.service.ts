import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TasksService {

    //const API_URL = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getUsers(){
      return this._http.get('http://localhost:2700/users',{
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  getSprints(){
      return this._http.get('http://localhost:2700/sprints',{
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  getTasks(){
      return this._http.get('http://localhost:2700/tasks', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
  showTask(id: number){
      return this._http.get('http://localhost:2700/tasks/'+id+'', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result).catch(() => {
          return  window.location.href = 'http://localhost:4200/not-found';
      });
  }
  createTask(arr: object){
      return this._http.post('http://localhost:2700/tasks', arr, {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
  }
    updateTask(id: number,arr: object){
        return this._http.patch('http://localhost:2700/tasks/'+id+'', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result);//.catch((err) => {
         //   return  window.location.href = 'http://localhost:4200/not-found';
       // });
    }
    deleteTask(id:number){
      return this._http.delete('http://localhost:2700/tasks/'+id+'', {
          headers: new HttpHeaders({'Accept': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem('token'),})
      }).map(result => result);
    }
    createVote(arr: object){
        return this._http.post('http://localhost:2700/tasks/vote_create', arr, {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result);
    }
    checkVote(id: string){
        return this._http.get('http://localhost:2700/tasks/vote_count/'+id+'', {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result);
    }
    checkVoter(id: string){
        return this._http.get('http://localhost:2700/tasks/voter_count/'+id+'', {
            headers: new HttpHeaders({'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token'),})
        }).map(result => result);
    }
    updateVote(id: number,arr: object){
        return this._http.put('http://localhost:2700/tasks/vote_update/'+id+'', arr, {
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
    getSprintById(id: number) {
        return this._http.get('http://localhost:2700/sprints/'+id+'', {
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
