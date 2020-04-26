import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
import { LeadsService } from './leads.service';
import { ActivatedRoute } from '@angular/router';
import { Lead } from './leads.model';
import { Users } from './users.model';
import { Client } from './client.model';

@Component({
  selector: 'app-leads-update',
  templateUrl: './leads-update.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsUpdateComponent implements OnInit {
    id: number;
    lead: any = new Lead('', '', 1, '', '', '', '');
    leads: Lead[] = [];
    date: any;
    user: any = new Users('', '');
    client: any = new Client('', '');
    users = [];
    clients = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];

    constructor(public leadsService: LeadsService, private route: ActivatedRoute) { }

    ngOnInit() {
    this.route.params.subscribe( params => this.leadsService.showLead(params['id']).subscribe(resLead => {
    this.date = new Date(resLead['contact_date']);
    this.lead = new Lead(resLead['title'], resLead['description'], resLead['status'], resLead['user_assigned'], resLead['client'], resLead['user_created'], this.date);
    this.id = params['id'];
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
}));
}
    updateLead() {
        this.leads.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.user_assigned, this.lead.client, this.lead.user_created, this.lead.contact_date));
        this.leadsService.updateLead(this.id, this.leads).subscribe(res => {
            this.leads.length = 0;
    });


    }

}
