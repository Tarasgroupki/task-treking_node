import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usersroles',
  templateUrl: './users_roles.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersRolesComponent implements OnInit {
    title = 'app';
    id: number;
    roles: object;
    checkedRoles: object;
    selectedCheckbox = [];
    unselectedCheckbox = [];
    checkboxes = [];

    constructor(private usersService: UsersService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe( () => this.usersService.getRoles().subscribe(resRoles => {
            this.roles = resRoles;
            this.route.params.subscribe( params => this.usersService.getCheckedRoles(params['id']).subscribe(resCheckedRoles => {
                this.id = params['id'];
                this.checkedRoles = resCheckedRoles;
            }));
        }));
    }
    onCkeckboxSelected(value) {
        if (this.selectedCheckbox.indexOf( value ) !== -1) {
            this.selectedCheckbox.splice(this.selectedCheckbox.indexOf( value ), 1);
        } else {
            this.selectedCheckbox.push(value);
        }
    }
    onCkeckboxUnSelected(value) {
        if (this.unselectedCheckbox.indexOf( value ) !== -1) {
            this.unselectedCheckbox.splice(this.unselectedCheckbox.indexOf( value ), 1);
        } else {
            this.unselectedCheckbox.push(value);
        }
    }
    assignRole() {
        this.checkboxes.push(this.selectedCheckbox, this.unselectedCheckbox);
        this.usersService.AssignRoles(this.id, this.checkboxes).subscribe(() => {});
    }

}
