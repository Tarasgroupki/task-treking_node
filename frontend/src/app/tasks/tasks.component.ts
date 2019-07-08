import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    title = 'app';
    tasks: object;
    displayedColumns = ['id', 'title', 'description', 'status', 'sprint_assigned', 'user_created', 'invoice_id', 'deadline', 'created_at'];

    constructor(private _tasks: TasksService) {}

    ngOnInit() {
        this._tasks.getTasks().subscribe(res => {
            this.tasks = res;
            for(let i in this.tasks){
              if(this.tasks[i].status == 2) {
                 this.tasks[i].status = 'Виконано';
              }
              else if(this.tasks[i].status == 1) {
                  this.tasks[i].status = 'Виконується';
              }
              else {
                  this.tasks[i].status = 'Не виконується';
              }
              this._tasks.getUserById(this.tasks[i].user_created).subscribe( res => {
                 this.tasks[i].user_created = res['name'];
              });
              this._tasks.getSprintById(this.tasks[i].sprint_assigned).subscribe( res => {
                  this.tasks[i].sprint_assigned = res['title'];
              });
            }
        });
    }

}
