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

    constructor(private _leads: LeadsService) {}

    ngOnInit() {
        this._leads.getLeads().subscribe(res => {
            this.leads = res;
            for (const i of Object.keys(this.leads)) {
                if (this.leads[i].status === 2) {
                    this.leads[i].status = 'Виконано';
                } else if (this.leads[i].status === 1) {
                    this.leads[i].status = 'Виконується';
                } else {
                    this.leads[i].status = 'Не виконується';
                }
                this._leads.getUserById(this.leads[i].user_created).subscribe( res => {
                    this.leads[i].user_created = res['name'];
                });
                this._leads.getUserById(this.leads[i].user_assigned).subscribe( res => {
                    this.leads[i].user_assigned = res['name'];
                });
                this._leads.getClientById(this.leads[i].client).subscribe( res => {
                    this.leads[i].client = res['name'];
                });
            }
        });
    }

}
