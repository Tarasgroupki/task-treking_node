import { Component, OnInit } from '@angular/core';
import { SprintsService } from './sprints.service';
import { ActivatedRoute,RouterModule, Router } from "@angular/router";


@Component({
  selector: 'app-sprints-delete',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsDeleteComponent {
    title = 'app';
    sprint: object;

    constructor(private _sprint: SprintsService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe( params => this._sprint.deleteSprint(params['id']).subscribe(res => {
            this.sprint = res;
            this.router.navigate(['sprints'])
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
