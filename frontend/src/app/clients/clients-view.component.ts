import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from './clients.model';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsViewComponent {
    title = 'app';
    client: Client = new Client('', '', '', '', '', '', '', '', '', '', '', 1);
    id: number;

    constructor(private _client: ClientsService, private route: ActivatedRoute, private _router: Router) {
        this.route.params.subscribe( params => this._client.showClient(params['id']).subscribe(res => {
            this.client = new Client(res['name'], res['email'], res['primary_number'], res['secondary_number'], res['address'], res['zipcode'], res['city'], res['company_name'], res['vat'], res['company_type'], res['user'], res['industry_id']);
           this.id = params['id'];
        }) );
    }
}
