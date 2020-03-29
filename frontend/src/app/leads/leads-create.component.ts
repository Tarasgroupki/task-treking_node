import { Component, OnInit } from '@angular/core';
import { LeadsService } from './leads.service';
import { Lead } from './leads.model';
import { Users } from './users.model';
import { Client } from './client.model';

@Component({
  selector: 'app-leads-create',
  templateUrl: './leads-create.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsCreateComponent implements OnInit {
    lead: any = new Lead('', '', 1, '', '', '5d10b7aae2ebc62620959dd2', '');
    leads: Lead[] = [];
    user: any = new Users('', '');
    client: any = new Client('', '');
    users = [];
    clients = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    loggedIn: object;

    constructor(public leadsService: LeadsService) {

    }

    addLead() {
        this.lead.user_created = '5d10b7aae2ebc62620959dd2';
        this.leads.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.user_assigned, this.lead.client, this.lead.user_created, this.lead.contact_date));
        this.loggedIn = JSON.parse(localStorage.getItem('LoggedIn'));
        this.leadsService.createLead({arr: this.leads}).subscribe(res => {
        this.lead = res;
        this.leads.length = 0;
    });
    }
    ngOnInit() {
        this.leadsService.getUsers().subscribe(resUsers => {
            for (let i = 0; i < Object.keys(resUsers).length; i++) {
                this.user = new Users(resUsers[i]._id, resUsers[i].name);
                this.users.push(this.user);
            }
        });
        this.leadsService.getClients().subscribe(resClients => {
            for (let i = 0; i < Object.keys(resClients).length; i++) {
                this.client = new Client(resClients[i]._id, resClients[i].name);
                this.clients.push(this.client);
            }
        });
    }
}
