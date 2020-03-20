import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { Sprints } from './sprints.model';
import { Users } from './users.model';

@Component({
  selector: 'app-tasks-create',
  templateUrl: './tasks-create.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksCreateComponent implements OnInit {

    task: any = new Task('', '', 1, '', '5d10b7aae2ebc62620959dd2', '');
    tasks: Task[] = [];
    statuses = [
        {value: 1, viewValue: 'Виконується'},
        {value: 2, viewValue: 'Виконано'},
        {value: 3, viewValue: 'Не виконується'}
    ];
    user: any = new Users('', '');
    users = [];
    sprint: any = new Sprints('', '');
    sprints = [];

    constructor(public _task_obj: TasksService) {

    }

    addTask() {
        this.tasks.push(new Task(this.task.title, this.task.description, this.task.status, this.task.sprint_assigned, this.task.user_created, this.task.deadline));
        this._task_obj.createTask(this.tasks).subscribe(res => {
        this.task = res;
        this.task.length = 0;
    });
    }
    ngOnInit() {
        this._task_obj.getSprints().subscribe(res => {
            for (let i = 0; i < Object.keys(res).length; i++) {
                this.sprint = new Users(res[i]._id, res[i].title);
                this.sprints.push(this.sprint);
            }
        });
    }

}
