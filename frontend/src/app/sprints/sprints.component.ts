import { Component, OnInit } from '@angular/core';
import { SprintsService } from './sprints.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './sprints.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsComponent implements OnInit {
    title = 'app';
    sprints: object;
    displayedColumns = ['id', 'title', 'description', 'status', 'lead_assigned', 'user_created', 'deadline', 'created_at'];

    constructor(private _sprints: SprintsService) {}

    ngOnInit() {
        this._sprints.getSprints().subscribe(resSprints => {
            this.sprints = resSprints;
            for (const i of Object.keys(this.sprints)) {
                if (this.sprints[i].status === 2) {
                    this.sprints[i].status = 'Виконано';
                } else if (this.sprints[i].status === 1) {
                    this.sprints[i].status = 'Виконується';
                } else {
                    this.sprints[i].status = 'Не виконується';
                }
                this._sprints.getUserById(this.sprints[i].user_created).subscribe( resUser => {
                    this.sprints[i].user_created = resUser['name'];
                });
                this._sprints.getLeadById(this.sprints[i].lead_assigned).subscribe( resLead => {
                    this.sprints[i].lead_assigned = resLead['title'];
                });
            }
        });
    }

}
