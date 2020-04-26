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
    checkedPermissions: object;
    selectedCheckbox = [];
    unselectedCheckbox = [];
    rolePerm = [];

    constructor(public settingsService: SettingsService, private route: ActivatedRoute) {

    }
    updateRole() {
      this.roles.push(this.role.name);
        this.settingsService.getRoleByName(this.role.name).subscribe(resRoleByName => {
            this.rolePerm.push(this.selectedCheckbox, this.unselectedCheckbox, this.roles);
            this.settingsService.updateRole(resRoleByName[0]['_id'], this.rolePerm).subscribe(() => {
                this.role.length = 0;
                this.rolePerm.length = 0;
                this.selectedCheckbox.length = 0;
                this.unselectedCheckbox.length = 0;
                this.getCheckedPermissions();
            });
        });
    }
    ngOnInit() {
        this.route.params.subscribe( params => this.settingsService.showRole(params['id']).subscribe(resRole => {
            this.role = new Roles(resRole['name']);
            this.id = params['id'];
        }));
        this.settingsService.getPermissions().subscribe(resPermissions => {
            this.permissions = resPermissions;
        });
        this.getCheckedPermissions();
    }
    getCheckedPermissions() {
       this.route.params.subscribe( params => this.settingsService.getOnePermission(params['id']).subscribe(resPermission => {
         this.id = params['id'];
         this.checkedPermissions = resPermission;
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

}
