import { Component, OnInit } from '@angular/core';
import { LeadsService } from './leads.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-leads-delete',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsDeleteComponent {
    title = 'app';
    lead: object;

    constructor(private leadsService: LeadsService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe( params => this.leadsService.deleteLead(params['id']).subscribe(resLead => {
            this.lead = resLead;
            this.router.navigate(['leads']);
            //  console.log(res);
        }) );
    }

}
