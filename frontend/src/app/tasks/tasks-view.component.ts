import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute } from "@angular/router";
import {Task} from './tasks.model';
import {Votes} from './votes.model';
//import { Task } from './tasks.model';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksViewComponent {
    title = 'app';
    selectedValue = 5;
    votes_arr: object;
    vote: any = new Votes(1, 1,5);
    votes: Votes[] = [];
    mark: number;
    users: any;
    user_id = JSON.parse(localStorage.getItem('LoggedIn'))['user']['id'];
    vote_id: object;
   // task: any = new Task('', '', 1, 1, 1, 1, 1, '');
   // tasks: Task[] = [];
  //  id: number;
    // _clientsArray: ClientsInterface[];
    task: object;

    constructor(private _task: TasksService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._task.showTask(params['id']).subscribe(res => {
           /* this.task = new Task(res['data']['title'], res['data']['description'], res['data']['status'], res['data']['user_assigned_id'], res['data']['user_created_id'], res['data']['client_id'], res['data']['invoice_id'], res['data']['deadline']);*/
           this.task = res['data'];
           this.votes_arr = [{'value' : 1}, {'value' : 2}, {'value' : 3}, {'value' : 5}, {'value' : 8}, {'value' : 13}, {'value' : 21}, {'value' : 34}, {'value' : 55}, {'value' : 89}, {'value' : 144}, {'value' : 233}];
            //  console.log(res);
            this._task.checkVote(this.task['id']).subscribe(res => {
                this.users = JSON.parse(res['data']);
                console.log(this.users);
            });
        }) );
    }

    onSelectedChange(value: number) {
        // do something else with the value
        console.log(value);

        // remember to update the selectedValue
        this.selectedValue = value;
    }

    addVote() {
        this.votes.push(new Votes(this.user_id, this.task['id'], this.selectedValue));
        this._task.createVote(this.votes).subscribe(res => {
            this.vote = res;
            console.log(res);
        });
        console.log(this.selectedValue);
    }

    updateVote() {
        this._task.checkVoter(this.user_id+'_'+this.task['id']).subscribe(res => {
            this.votes.push(new Votes(this.user_id, this.task['id'], this.selectedValue));
            this.vote_id = res;
            console.log(this.votes);
            this._task.updateVote(JSON.parse(this.vote_id['data'])['id'], this.votes).subscribe(res => {
                console.log(res);
                this.votes.length = 0;
            });
        });
    }

  /*  ngOnInit() {
        this._task.checkVote(this.task['id']).subscribe(res => {
            this.users = res['data'];
            console.log(res);
        });
    }
   /* ngOnInit() {

       /* this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
