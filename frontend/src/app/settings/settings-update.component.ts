import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { Roles } from './settings.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-settings-update',
    templateUrl: './settings-update.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsUpdateComponent implements OnInit {
    id: number;
    role: any = new Roles('');
    roles: Roles[] = [];
    permissions: object;
    checked_permissions: object;
    selected_checkbox = [];
    unselected_checkbox = [];
    role_perm = [];

    constructor(public _setting_obj: SettingsService, private route: ActivatedRoute) {

    }
    updateRole() {
        this._setting_obj.getRoleByName(this.role.name).subscribe(res => {
            this.roles.push(this.role.name);
            this.role_perm.push(this.selected_checkbox, this.unselected_checkbox, this.roles);
            this._setting_obj.updateRole(res[0]['_id'], this.role_perm).subscribe(res => {
                this.role = res;
            });
        });
    }
    ngOnInit() {
        this.route.params.subscribe( params => this._setting_obj.showRole(params['id']).subscribe(res => {
            this.role = new Roles(res[0]['name']);
            this.id = params['id'];
        }));
        this._setting_obj.getPermissions().subscribe(res => {
            this.permissions = res;
        });
        this.route.params.subscribe( params => this._setting_obj.getOnePermission(params['id']).subscribe(res => {
            this.id = params['id'];
                this.checked_permissions = res;
        }));
    }
    onCkeckboxSelected(value) {
        if (this.selected_checkbox.indexOf( value ) !== -1) {
            this.selected_checkbox.splice(this.selected_checkbox.indexOf( value ), 1);
        } else {
            this.selected_checkbox.push(value);
        }
        console.log(this.selected_checkbox);
    }
    onCkeckboxUnSelected(value) {
        if (this.unselected_checkbox.indexOf( value ) !== -1) {
            this.unselected_checkbox.splice(this.unselected_checkbox.indexOf( value ), 1);
        } else {
            this.unselected_checkbox.push(value);
        }
        console.log(this.unselected_checkbox);
    }

}
