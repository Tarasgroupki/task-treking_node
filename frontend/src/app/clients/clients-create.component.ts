import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
import { Client } from './clients.model';
import { Users } from './users.model';

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsCreateComponent implements OnInit {
    client: any = new Client('', '', '', '', '', '', '', '', '', '', '', 1);
    clients: Client[] = [];
    user: any = new Users('', '');
    users = [];

    constructor(public _client_obj: ClientsService) {

    }

    addClient() {
        this.clients.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.company_type, this.client.user, this.client.industry_id));
        this._client_obj.createClient(this.clients).subscribe(res => {
        this.client = res;
        this.clients.length = 0;
    });
    }
    ngOnInit() {
        this._client_obj.getUsers().subscribe(res => {
            for (let i = 0; i < Object.keys(res).length; i++) {
                this.user = new Users(res[i]._id, res[i].name);
                this.users.push(this.user);
            }
        });
    }
}
