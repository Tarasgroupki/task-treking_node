import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-tasks-delete',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksDeleteComponent {
    title = 'app';
    task: object;

    constructor(private tasksService: TasksService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe( params => this.tasksService.deleteTask(params['id']).subscribe(resTask => {
            this.task = resTask;
            this.router.navigate(['tasks']);
        }) );
    }

}
