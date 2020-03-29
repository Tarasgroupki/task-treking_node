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

    constructor(private clientsService: ClientsService, private route: ActivatedRoute, private _router: Router) {
        this.route.params.subscribe( params => this.clientsService.showClient(params['id']).subscribe(resClient => {
            this.client = new Client(resClient['name'], resClient['email'], resClient['primary_number'], resClient['secondary_number'], resClient['address'], resClient['zipcode'], resClient['city'], resClient['company_name'], resClient['vat'], resClient['company_type'], resClient['user'], resClient['industry_id']);
           this.id = params['id'];
        }) );
    }
}
