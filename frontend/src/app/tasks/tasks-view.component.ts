import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute } from '@angular/router';
import {Task} from './tasks.model';
import {Votes} from './votes.model';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksViewComponent {
    id: string;
    title = 'app';
    selectedValue = 5;
    votes_arr: object;
    vote: any = new Votes('', '', 5);
    votes: Votes[] = [];
    mark: number;
    users: any;
    user_id = JSON.parse(localStorage.getItem('LoggedIn'))['user'][0]['_id'];
    vote_id: any;
    task: any = new Task('', '', 1, '', '',  '');

    constructor(private _task: TasksService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._task.showTask(params['id']).subscribe(resTask => {
            this.id = params['id'];
            this.task = new Task(resTask['title'], resTask['description'], resTask['status'], resTask['user_assigned'], resTask['user_created'], resTask['deadline']);
           this.votes_arr = [{'value' : 1}, {'value' : 2}, {'value' : 3}, {'value' : 5}, {'value' : 8}, {'value' : 13}, {'value' : 21}, {'value' : 34}, {'value' : 55}, {'value' : 89}, {'value' : 144}, {'value' : 233}];
             // console.log(this.task);
            this._task.checkVote(this.id).subscribe(resVote => {
                this.users = resVote;
           //     console.log(this.users);
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
        this.votes.push(new Votes(this.user_id, this.id, this.selectedValue));
        this._task.createVote(this.votes).subscribe(resVote => {
            this.vote = resVote;
           // console.log(res);
        });
        console.log(this.selectedValue);
    }

    updateVote() {
        this._task.checkVoter(this.user_id + '_' + this.id).subscribe(resVoter => {
            this.votes.push(new Votes(this.user_id, this.id, this.selectedValue));
            this.vote_id = resVoter;
            this._task.updateVote(this.vote_id[0]['_id'], this.votes).subscribe(resVote => {
             //   console.log(resVote);
                this.votes.length = 0;
            });
        });
    }

}
