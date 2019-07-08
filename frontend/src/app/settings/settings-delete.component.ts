import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { ActivatedRoute,RouterModule, Router } from "@angular/router";


@Component({
  selector: 'app-settings-delete',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsDeleteComponent {
    title = 'app';
    role: object;

    constructor(private _role: SettingsService, private route: ActivatedRoute,private router: Router) {
        this.route.params.subscribe( params => this._role.deleteRole(params['id']).subscribe(res => {
            this.role = res;
            this.router.navigate(['roles'])
            //  console.log(res);
        }) );
    }

  /*  ngOnInit() {
        this._client.showClient().subscribe(res => {
            this.client = res;
          //  console.log(res);
        });*/
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
