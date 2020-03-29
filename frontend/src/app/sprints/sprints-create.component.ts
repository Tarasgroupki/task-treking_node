import { Component, OnInit } from '@angular/core';
import { SprintsService } from './sprints.service';
import { Sprint } from './sprints.model';
import { Users } from './users.model';
import { Leads } from './leads.model';

@Component({
  selector: 'app-sprints-create',
  templateUrl: './sprints-create.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsCreateComponent implements OnInit {
   // log(x) { console.log(x); }
    sprint: any = new Sprint('', '', 1, '', '5d10b7aae2ebc62620959dd2', '');
    sprints: Sprint[] = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    user: any = new Users('', '');
    users = [];
    lead: any = new Leads('', '');
    leads = [];

    constructor(public sprintsService: SprintsService) {

    }

    addSprint() {
        this.sprints.push(new Sprint(this.sprint.title, this.sprint.description, this.sprint.status, this.sprint.lead_assigned, this.sprint.user_created, this.sprint.deadline));
        this.sprintsService.createSprint(this.sprints).subscribe(resSprint => {
        this.sprint = resSprint;
        this.sprints.length = 0;
    });
    }
    ngOnInit() {
        this.sprintsService.getUsers().subscribe(resUsers => {
            for (let i = 0; i < Object.keys(resUsers).length; i++) {
                this.user = new Users(resUsers[i]._id, resUsers[i].name);
                this.users.push(this.user);
            }
        });
        this.sprintsService.getLeads().subscribe(resLeads => {
            for (let i = 0; i < Object.keys(resLeads).length; i++) {
                this.lead = new Leads(resLeads[i]._id, resLeads[i].title);
                this.leads.push(this.lead);
            }
        });
    }

}
