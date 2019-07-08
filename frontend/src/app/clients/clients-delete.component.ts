import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { ActivatedRoute,RouterModule, Router } from "@angular/router";


@Component({
  selector: 'app-clients-delete',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsDeleteComponent {
    title = 'app';
    client: object;

    constructor(private _client: ClientsService, private route: ActivatedRoute,private router: Router) {
        this.route.params.subscribe( params => this._client.deleteClient(params['id']).subscribe(res => {
            this.client = res;
            this.router.navigate(['clients'])
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
