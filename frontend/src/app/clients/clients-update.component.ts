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

    constructor(public clientsService: ClientsService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this.clientsService.showClient(params['id']).subscribe(resClient => {
    this.client = new Client(resClient['name'], resClient['email'], resClient['primary_number'], resClient['secondary_number'], resClient['address'], resClient['zipcode'], resClient['city'], resClient['company_name'], resClient['vat'], resClient['company_type'], resClient['user'], resClient['industry_id']);
    this.id = params['id'];
        this.clientsService.getUsers().subscribe(resUser => {
            for (let i = 0; i < Object.keys(resUser).length; i++) {
                this.user = new Users(resUser[i]._id, resUser[i].name);
                this.users.push(this.user);
            }
            this.selectedValue = this.users[0].value.toString();
        });
}));
}

    updateClient() {
        this.clientObj.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address, this.client.zipcode, this.client.city, this.client.company_name, this.client.vat, this.client.company_type, this.client.user, this.client.industry_id));
        this.clientsService.updateClient(this.id, this.clientObj).subscribe(() => {
            this.clientObj.length = 0;
    });
    }
}
