import { Component, OnInit } from '@angular/core';
import { LeadsService } from './leads.service';
//import { ActivatedRoute } from "@angular/router";
//import { FormGroup, FormBuilder } from '@angular/forms';
import { Lead } from './leads.model';
import { Users } from './users.model';
import { Client } from './client.model';

@Component({
  selector: 'app-leads-create',
  templateUrl: './leads-create.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsCreateComponent implements OnInit {
   // log(x) { console.log(x); }
    ///client: any = 1;
    lead: any = new Lead('', '', 1, '', '', '5d10b7aae2ebc62620959dd2', '');
    leads: Lead[] = [];
    user: any = new Users('','');
    client: any = new Client('','');
    users = [];
    clients = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    loggedIn: object;

    constructor(public _lead_obj: LeadsService) {

    }

    addLead(){
        this.lead.user_created = '5d10b7aae2ebc62620959dd2';
        this.leads.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.user_assigned, this.lead.client, this.lead.user_created, this.lead.contact_date));
        console.log(this.leads);
        this.loggedIn = JSON.parse(localStorage.getItem('LoggedIn'));
        //this._lead_obj.getRole({token: this.loggedIn['token']}).subscribe(res => {
          //  console.log(res);
        //});
        this._lead_obj.createLead({arr: this.leads}).subscribe(res => {
        this.lead = res;
        this.leads.length = 0;
        console.log(res);
    });
    }
    ngOnInit() {
        this._lead_obj.getUsers().subscribe(res => {
            for (let i = 0; i < Object.keys(res).length; i++) {
                this.user = new Users(res[i]._id, res[i].name);
                this.users.push(this.user);
                console.log(this.users);
            }
        });
        this._lead_obj.getClients().subscribe(res => {
            for (let i = 0; i < Object.keys(res).length; i++) {
                this.client = new Client(res[i]._id, res[i].name);
                this.clients.push(this.client);
                console.log(this.clients);
            }
        });
    }
}
