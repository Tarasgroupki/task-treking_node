import { Component, OnInit } from '@angular/core';
import { ClientsService } from './clients.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
    title = 'app';
    clients: object;
    public LogginningData = JSON.parse(localStorage.getItem('LoggedIn'));
    displayedColumns = ['id', 'name', 'email', 'primary_number', 'secondary_number', 'address', 'zipcode', 'city', 'company_name', 'industry'];

    constructor(private clientsService: ClientsService) {}

    ngOnInit() {
        this.clientsService.getClients().subscribe(resClients => {
            this.clients = resClients;
        });
    }

}
