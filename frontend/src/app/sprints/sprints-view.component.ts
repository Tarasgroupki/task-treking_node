import { Component, OnInit } from '@angular/core';
import { SprintsService } from './sprints.service';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Sprint } from './sprints.model';

@Component({
  selector: 'app-sprints-view',
  templateUrl: './sprints-view.component.html',
  styleUrls: ['./sprints.component.css']
})
export class SprintsViewComponent {
    title = 'app';
    sprint: any = new Sprint('', '', 1, '', '', '');
    chart = [];
    id: string;

    constructor(private _sprint: SprintsService, private route: ActivatedRoute) {
        this.route.params.subscribe( params => this._sprint.showSprint(params['id']).subscribe(resSprint => {
            this.sprint = new Sprint(resSprint['title'], resSprint['description'], resSprint['status'], resSprint['lead_assigned'], resSprint['user_created'], resSprint['deadline']);
           this.id = params['id'];
           this._sprint.dailyForecast(this.id)
                .subscribe(res => {
                    const temp_max = Object.values(res[0]);
                    const temp_min = res[2];
                    const alldates = res[1];

                    const weatherDates = [];
                    alldates.forEach((res) => {
                        const jsdate = res;
                       weatherDates.push(jsdate);
                    });

                    this.chart = new Chart('canvas', {
                        type: 'line',
                        data: {
                            labels: weatherDates,
                            datasets: [
                                {
                                    data: temp_max,
                                    borderColor: '#3cba9f',
                                    fill: false
                                },
                                {
                                    data: temp_min,
                                    borderColor: '#ffcc00',
                                    fill: false
                                },
                            ]
                        },
                        options: {
                            legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                    display: true
                                }],
                                yAxes: [{
                                    display: true
                                }]
                            }
                        }
                    });

                });
        }) );
    }
}
