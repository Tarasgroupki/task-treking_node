import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
import { ClientsService } from './clients.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from './clients.model';
import { Users } from './users.model';

@Component({
  selector: 'app-clients-update',
  templateUrl: './clients-update.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsUpdateComponent implements OnInit {
    id: number;
    client: Client = new Client('Taras', 'taras2andry@mail.ru', '0507212852', '0507212852', 'Kalush', '77300', 'Kalush', 'IFNTUOG', '321', 'University', '', 1);
    clientObj: Client[] = [];
    user: any = new Users('', '');
    users = [];
    selectedValue: number;

    constructor(public _client_obj: ClientsService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._client_obj.showClient(params['id']).subscribe(res => {
    this.client = new Client(res['name'], res['email'], res['primary_number'], res['secondary_number'], res['address'], res['zipcode'], res['city'], res['company_name'], res['vat'], res['company_type'], res['user'], res['industry_id']);
    this.id = params['id'];
        this._client_obj.getUsers().subscribe(res => {
            for (let i = 0; i < Object.keys(res).length; i++) {
                this.user = new Users(res[i]._id, res[i].name);
                this.users.push(this.user);
            }
            this.selectedValue = this.users[0].value.toString();
        });
}));
}

    updateClient() {
        this.clientObj.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.company_type, this.client.user, this.client.industry_id));
        this._client_obj.updateClient(this.id, this.clientObj).subscribe(res => {
            this.clientObj.length = 0;
    });
    }
}
