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
    selectedCheckbox = [];
    rolePerm = [];
    permissions: object;

    constructor(public settingsService: SettingsService) {

    }
    addRole() {
        this.roles.push(new Roles(this.role.name));
        this.settingsService.createRole(this.roles).subscribe(resRole => {
            this.settingsService.getRoleByName(this.role.name).subscribe(resRoleByName => {
                for (let i = 0; i < this.selectedCheckbox.length; i++) {
                    this.rolePerm.push([resRoleByName[0]['_id'], this.selectedCheckbox[i]]);
                }
                this.settingsService.createRole_has_perm(this.rolePerm).subscribe(resRoleHasPerm => {
                    this.role = resRoleHasPerm;
                });
            });
        });

    }
    ngOnInit() {
        this.settingsService.getPermissions().subscribe(resPermissions => {
            this.permissions = resPermissions;
        });
    }
    onCkeckboxSelected(value) {
        if (this.selectedCheckbox.indexOf( value ) !== -1) {
            this.selectedCheckbox.splice(this.selectedCheckbox.indexOf( value ), 1);
        } else {
            this.selectedCheckbox.push(value);
        }
    }

}
