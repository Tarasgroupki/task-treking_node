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

    constructor(private leadsService: LeadsService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this.leadsService.showLead(params['id']).subscribe(resLead => {
            this.lead = new Lead(resLead['title'], resLead['description'], resLead['status'], resLead['user_assigned_id'], resLead['client_id'], resLead['user_created_id'], resLead['contact_date']);
            this.id = params['id'];
        }) );
    }

}
