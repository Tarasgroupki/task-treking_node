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
    user: any = new Users('','');
    client: any = new Client('','');
    users = [];
    clients = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    selected: string;


    constructor(public _lead_obj: LeadsService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._lead_obj.showLead(params['id']).subscribe(res => {
        this.date = new Date(res['contact_date']);
      //  dateformat(this.date, 'DD.MM.YYYY');
        console.log(this.date);
    this.lead = new Lead(res['title'], res['description'], res['status'], res['user_assigned'], res['client'], res['user_created'], this.date);
    this.id = params['id'];
     this._lead_obj.getUsers().subscribe(res => {
         for (let i = 0; i < Object.keys(res).length; i++) {
             this.user = new Users(res[i]._id, res[i].name);
             this.users.push(this.user);
             console.log(this.users);
         }
         //this.selected = this.users[0].value;
     });
      this._lead_obj.getClients().subscribe(res => {
          for (let i = 0; i < Object.keys(res).length; i++) {
              this.client = new Client(res[i]._id, res[i].name);
              this.clients.push(this.client);
          }
          //this.selected = this.clients[0].value;
      });
     //this.selected = res['data']['user_id'];

     console.log(this.lead.contact_date);
}));
}


    updateLead() {
        this.leads.push(new Lead(this.lead.title, this.lead.description, this.lead.status, this.lead.user_assigned, this.lead.client, this.lead.user_created, this.lead.contact_date));
       // console.log(this.clients[0]['name']);
       // this.selected = this.client.user_id;
        this._lead_obj.updateLead(this.id, this.leads).subscribe(res => {
            this.leads.length = 0;
        console.log(res);
    });


    }

}
