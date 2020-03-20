import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { Roles } from './settings.model';

@Component({
  selector: 'app-settings-create',
  templateUrl: './settings-create.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsCreateComponent implements OnInit {
    role: any = new Roles('');
    roles: Roles[] = [];
    selected_checkbox = [];
    role_perm = [];
    permissions: object;

    constructor(public _setting_obj: SettingsService) {

    }
    addRole() {
        this.roles.push(new Roles(this.role.name));
        this._setting_obj.createRole(this.roles).subscribe(res => {
            this._setting_obj.getRoleByName(this.role.name).subscribe(res => {
                for (let i = 0; i < this.selected_checkbox.length; i++) {
                    this.role_perm.push([res[0]['_id'], this.selected_checkbox[i]]);
                }
                this._setting_obj.createRole_has_perm(this.role_perm).subscribe(res => {
                    this.role = res;
                });
            });
        });

    }
    ngOnInit() {
        this._setting_obj.getPermissions().subscribe(res => {
            this.permissions = res;
        });
    }
    onCkeckboxSelected(value) {
        if (this.selected_checkbox.indexOf( value ) !== -1) {
            this.selected_checkbox.splice(this.selected_checkbox.indexOf( value ), 1);
        } else {
            this.selected_checkbox.push(value);
        }
    }

}
