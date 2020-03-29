import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-settings-delete',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsDeleteComponent {
    title = 'app';
    role: object;

    constructor(private settingsService: SettingsService, private route: ActivatedRoute, private router: Router) {
        this.route.params.subscribe( params => this.settingsService.deleteRole(params['id']).subscribe(resRole => {
            this.role = resRole;
            this.router.navigate(['roles']);
        }) );
    }

}
