import { Component, OnInit } from '@angular/core';
//import { ApiService } from './api.service';
import {ClientsInterface} from './clients-interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
 // providers: [ApiService]
})
export class AppComponent implements OnInit {
  title = 'app';
  public LogginningData = JSON.parse(localStorage.getItem('LoggedIn'));
  route: string;
  constructor(private _router: Router) {
      console.log(this.LogginningData);
       _router.events.subscribe((url: any) => {
         this.route = url['url'];
         if(this.route == '/') {
             this._router.navigate(['profile']);
         }
       //  console.log(this.route);
       });
       //console.log(this._router.url);
  }

  ngOnInit() {
      //localStorage.removeItem('token');
      //localStorage.removeItem('LoggedIn');
      if(!localStorage.getItem('LoggedIn')){
          this._router.navigate(['login']);
      }

    }
    removeAuth() {
       // console.log(JSON.parse(localStorage.getItem('LoggedIn')));
        localStorage.removeItem('token');
        localStorage.removeItem('LoggedIn');
    }
}
