import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';
//import { ActivatedRoute } from "@angular/router";
//import { FormGroup, FormBuilder } from '@angular/forms';
import { Client } from './clients.model';
import { Users } from './users.model';

@Component({
  selector: 'app-clients-create',
  templateUrl: './clients-create.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsCreateComponent implements OnInit
{
   // log(x) { console.log(x); }
    ///client: any = 1;
    client: any = new Client('', '', '', '', '', '', '', '', '', '', '', 1);
    clients: Client[] = [];
    user: any = new Users('','');
    users = [];

    constructor(public _client_obj: ClientsService) {

    }

    addClient(){
        this.clients.push(new Client(this.client.name, this.client.email, this.client.primary_number, this.client.secondary_number, this.client.address,this.client.zipcode,this.client.city,this.client.company_name,this.client.vat,this.client.company_type,this.client.user,this.client.industry_id));
        console.log(typeof this.clients);
        this._client_obj.createClient(this.clients).subscribe(res => {
        this.client = res;
        this.clients.length = 0;
        console.log(res);
    });
    }
    ngOnInit() {
        this._client_obj.getUsers().subscribe(res => {
            for (let i = 0; i < Object.keys(res).length; i++) {
                this.user = new Users(res[i]._id, res[i].name);
                this.users.push(this.user);
                console.log(this.users);
            }
        });
    }
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
