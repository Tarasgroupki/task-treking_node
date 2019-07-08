import { Component, OnInit } from '@angular/core';
import { SprintsService } from './sprints.service';
//import { ActivatedRoute } from "@angular/router";
//import { FormGroup, FormBuilder } from '@angular/forms';
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
    user: any = new Users('','');
    users = [];
    lead: any = new Leads('', '');
    leads = [];
   // dateObj: object;
   // dateString: string;

    constructor(public _sprint_obj: SprintsService) {

    }

    addSprint() {
       // this.dateObj = new Date(this.task.deadline);
      //  this.dateString += this.dateObj.getFullYear() + "-";
       // this.dateString += (this.dateObj.getMonth()) + "-";
       // this.dateString += this.dateObj.getDate();
       // this.task.deadline = Date.parse(this.task.deadline);
        this.sprints.push(new Sprint(this.sprint.title, this.sprint.description, this.sprint.status, this.sprint.lead_assigned, this.sprint.user_created, this.sprint.deadline));
       // console.log(this.task.deadline);
        this._sprint_obj.createSprint(this.sprints).subscribe(res => {
        this.sprint = res;
        this.sprints.length = 0;
        console.log(res);
    });
    }
    ngOnInit() {
        this._sprint_obj.getUsers().subscribe(res => {
            for (let i = 0; i < Object.keys(res).length; i++) {
                //console.log(this.id);
                this.user = new Users(res[i]._id, res[i].name);
                this.users.push(this.user);
                console.log(this.users);
            }
        });
        this._sprint_obj.getLeads().subscribe(res => {
            for (let i = 0; i < Object.keys(res).length; i++) {
                //console.log(this.id);
                this.lead = new Leads(res[i]._id, res[i].title);
                this.leads.push(this.lead);
                console.log(this.leads);
            }
        });
    }

}
