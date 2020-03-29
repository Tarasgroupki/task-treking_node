import { Component, OnInit } from '@angular/core';
import { LeadsService } from './leads.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
    title = 'app';
    leads: object;
    displayedColumns = ['id', 'title', 'description', 'status', 'user_assigned', 'client', 'user_created', 'contact_date', 'created_at'];

    constructor(private leadsService: LeadsService) {}

    ngOnInit() {
        this.leadsService.getLeads().subscribe(resLeads => {
            this.leads = resLeads;
            for (const i of Object.keys(this.leads)) {
                if (this.leads[i].status === 2) {
                    this.leads[i].status = 'Виконано';
                } else if (this.leads[i].status === 1) {
                    this.leads[i].status = 'Виконується';
                } else {
                    this.leads[i].status = 'Не виконується';
                }
                this.leadsService.getUserById(this.leads[i].user_created).subscribe( resUser => {
                    this.leads[i].user_created = resUser['name'];
                });
                this.leadsService.getUserById(this.leads[i].user_assigned).subscribe( resUser => {
                    this.leads[i].user_assigned = resUser['name'];
                });
                this.leadsService.getClientById(this.leads[i].client).subscribe( resClient => {
                    this.leads[i].client = resClient['name'];
                });
            }
        });
    }

}
