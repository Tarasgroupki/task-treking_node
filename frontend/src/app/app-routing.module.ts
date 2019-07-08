import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientsComponent} from './clients/clients.component';
import {ClientsViewComponent} from './clients/clients-view.component';

const routes: Routes = [
    {
        path: 'clients',
        component: ClientsComponent
    },
    {
        path: 'clients/:id',
        component: ClientsViewComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
