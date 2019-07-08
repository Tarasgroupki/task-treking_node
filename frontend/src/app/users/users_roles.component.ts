import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-usersroles',
  templateUrl: './users_roles.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersRolesComponent implements OnInit {
    title = 'app';
    id: number;
    roles: object;
    checked_roles: object;
    selected_checkbox = [];
    unselected_checkbox = [];
    checkboxes = [];
  //  displayedColumns = ['id', 'name', 'email', 'password', 'address', 'work_number', 'personal_number', 'image_path'];

    constructor(private _users: UsersService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe( params => this._users.getRoles(params['id']).subscribe(res => {
            this.id = params['id'];
            this.roles = res['data']['roles'];
            if(res['data']['roles_id']){
                this.checked_roles = res['data']['roles_id'];
            }
            console.log(this.checked_roles);
        }));
    }
    onCkeckboxSelected(value) {
        if(this.selected_checkbox.indexOf( value ) != -1) {
            this.selected_checkbox.splice(this.selected_checkbox.indexOf( value ), 1);
        }
        else {
            this.selected_checkbox.push(value);
        }
        console.log(this.selected_checkbox);
    }
    onCkeckboxUnSelected(value) {
        if(this.unselected_checkbox.indexOf( value ) != -1) {
            this.unselected_checkbox.splice(this.unselected_checkbox.indexOf( value ), 1);
        }
        else {
            this.unselected_checkbox.push(value);
        }
        console.log(this.unselected_checkbox);
    }
    assignRole() {
        this.checkboxes.push(this.selected_checkbox, this.unselected_checkbox);
        this._users.AssignRoles(this.id, this.checkboxes).subscribe(res => {
            console.log(res);
        });
    }

}
