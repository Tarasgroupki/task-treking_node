import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    title = 'app';
    roles: object;
    displayedColumns = ['id', 'name', '_v'];

    constructor(private settingsService: SettingsService) {}

    ngOnInit() {
        this.settingsService.getRoles().subscribe(resRoles => {
            this.roles = resRoles;
            console.log(resRoles);
        });
    }

}
