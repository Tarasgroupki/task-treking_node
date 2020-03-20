import { Component, OnInit } from '@angular/core';
import { LeadsService } from './leads.service';
import { ActivatedRoute } from '@angular/router';
import { Lead } from './leads.model';

@Component({
  selector: 'app-leads-view',
  templateUrl: './leads-view.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsViewComponent {
    title = 'app';
    lead: any = new Lead('', '', 1, '', '', '', '');
    id: number;

    constructor(private _lead: LeadsService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._lead.showLead(params['id']).subscribe(res => {
            this.lead = new Lead(res['title'], res['description'], res['status'], res['user_assigned_id'], res['client_id'], res['user_created_id'], res['contact_date']);
            this.id = params['id'];
        }) );
    }

}
