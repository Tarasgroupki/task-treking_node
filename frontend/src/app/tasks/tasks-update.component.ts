import { Component, OnInit, OnChanges , SimpleChange } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute } from '@angular/router';
import { Task } from './tasks.model';
import { Sprints } from './sprints.model';
import {Users} from '../leads/users.model';

@Component({
  selector: 'app-tasks-update',
  templateUrl: './tasks-update.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksUpdateComponent implements OnInit {
    id: number;
    task: any = new Task('', '', 1, '', '5d10b7aae2ebc62620959dd2', '');
    tasks: Task[] = [];
    date: any;
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    user: any = new Users('', '');
    users = [];
    sprint: any = new Users('', '');
    sprints = [];
   selected: number;

    constructor(public _task_obj: TasksService, private route: ActivatedRoute) {

    }
    ngOnInit() {
    this.route.params.subscribe( params => this._task_obj.showTask(params['id']).subscribe(resTask => {
    this.date = new Date(resTask['deadline']);
    this.task = new Task(resTask['title'], resTask['description'], resTask['status'], resTask['sprint_assigned'], resTask['user_created'], this.date);
    this.id = params['id'];
     this._task_obj.getUsers().subscribe(resUsers => {
         for (let i = 0; i < Object.keys(resUsers).length; i++) {
             this.user = new Users(resUsers[i]._id, resUsers[i].name);
             this.users.push(this.user);
         }
     });
     this._task_obj.getSprints().subscribe(resSprints => {
         for (let i = 0; i < Object.keys(resSprints).length; i++) {
             console.log(this.id);
             this.sprint = new Sprints(resSprints[i]._id, resSprints[i].title);
             this.sprints.push(this.sprint);
             console.log(this.sprints);
         }
     });
    console.log(this.selected);
}));
}

    updateTask() {
        this.tasks.push(new Task(this.task.title, this.task.description, this.task.status, this.task.sprint_assigned, this.task.user_created, this.task.deadline));
        this._task_obj.updateTask(this.id, this.tasks).subscribe(res => {
            this.tasks.length = 0;
    });


    }

}
