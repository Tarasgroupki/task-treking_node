import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Router,ActivatedRoute } from "@angular/router";
import { Client } from './clients.model';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsViewComponent {
    title = 'app';
    client: Client = new Client('', '', '', '', '', '', '', '', '', '', '', 1);
    //clients: Client[] = [];
  //  id: number;
    // _clientsArray: ClientsInterface[];
    id: number;
    //client: object;

    constructor(private _client: ClientsService, private route: ActivatedRoute, private _router: Router) {
        this.route.params.subscribe( params => this._client.showClient(params['id']).subscribe(res => {
            this.client = new Client(res['name'], res['email'], res['primary_number'], res['secondary_number'], res['address'], res['zipcode'], res['city'], res['company_name'], res['vat'], res['company_type'], res['user'], res['industry_id']);
          // if(this.client['name'] == '') {
          //     this._router.navigate(['*']);
         //  }
           this.id = params['id'];

         //  console.log('Error');
        }) )//.unsubscribe(
          //   this._router.navigate(['not-found']);
      //  );
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
