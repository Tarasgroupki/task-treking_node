import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
import { SprintsService } from './sprints.service';
import { ActivatedRoute } from '@angular/router';
import { Sprint } from './sprints.model';
import {Users} from '../leads/users.model';
import {Leads} from './leads.model';

@Component({
  selector: 'app-sprints-update',
  templateUrl: './sprints-update.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsUpdateComponent implements OnInit {
    id: number;
    sprint: any = new Sprint('', '', 1, '', '5d10b7aae2ebc62620959dd2', '');
    sprints: Sprint[] = [];
    date: any;
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    user: any = new Users('', '');
    users = [];
    lead: any = new Leads('', '');
    leads = [];
    selected: number;

    constructor(public sprintsService: SprintsService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this.sprintsService.showSprint(params['id']).subscribe(resSprint => {
    this.date = new Date(resSprint['deadline']);
    this.sprint = new Sprint(resSprint['title'], resSprint['description'], resSprint['status'], resSprint['lead_assigned'], resSprint['user_created'], this.date);
    this.id = params['id'];
     this.sprintsService.getUsers().subscribe(resUsers => {
         for (let i = 0; i < Object.keys(resUsers).length; i++) {
             this.user = new Users(resUsers[i]._id, resUsers[i].name);
             this.users.push(this.user);
         }
     });
        this.sprintsService.getLeads().subscribe(resLeads => {
            for (let i = 0; i < Object.keys(resLeads).length; i++) {
                console.log(this.id);
                this.lead = new Leads(resLeads[i]._id, resLeads[i].title);
                this.leads.push(this.lead);
            }
        });
    console.log(this.selected);
}));
}


    updateSprint() {
        this.sprints.push(new Sprint(this.sprint.title, this.sprint.description, this.sprint.status, this.sprint.lead_assigned, this.sprint.user_created, this.sprint.deadline));
        this.sprintsService.updateSprint(this.id, this.sprints).subscribe(() => {
            this.sprints.length = 0;
    });
    }

}
