import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class GraphService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get('http://task-treking/public/api/points')
      .map(result => result);
  }



}
