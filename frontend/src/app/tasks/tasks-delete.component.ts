import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { ActivatedRoute,RouterModule, Router } from "@angular/router";


@Component({
  selector: 'app-tasks-delete',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksDeleteComponent {
    title = 'app';
    task: object;

    constructor(private _task: TasksService, private route: ActivatedRoute,private router: Router) {
        this.route.params.subscribe( params => this._task.deleteTask(params['id']).subscribe(res => {
            this.task = res;
            this.router.navigate(['tasks'])
            //  console.log(res);
        }) );
    }

  /*  ngOnInit() {
        this._client.showClient().subscribe(res => {
            this.client = res;
          //  console.log(res);
        });*/
    /*ngOnInit() {
        this._clients.getClients().subscribe(res => {
            this.clients = res;
        });
    }*/

}
