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

    constructor(private tasksService: TasksService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this.tasksService.showTask(params['id']).subscribe(resTask => {
            this.id = params['id'];
            this.task = new Task(resTask['title'], resTask['description'], resTask['status'], resTask['user_assigned'], resTask['user_created'], resTask['deadline']);
           this.votes_arr = [{'value' : 1}, {'value' : 2}, {'value' : 3}, {'value' : 5}, {'value' : 8}, {'value' : 13}, {'value' : 21}, {'value' : 34}, {'value' : 55}, {'value' : 89}, {'value' : 144}, {'value' : 233}];
            this.tasksService.checkVote(this.id).subscribe(resVote => {
                this.users = resVote;
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
        this.tasksService.createVote(this.votes).subscribe(resVote => {
            this.vote = resVote;
        });
        console.log(this.selectedValue);
    }

    updateVote() {
        this.tasksService.checkVoter(this.user_id + '_' + this.id).subscribe(resVoter => {
            this.votes.push(new Votes(this.user_id, this.id, this.selectedValue));
            this.vote_id = resVoter;
            this.tasksService.updateVote(this.vote_id[0]['_id'], this.votes).subscribe(() => {
                this.votes.length = 0;
            });
        });
    }

}
