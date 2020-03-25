import {Component, OnInit} from '@angular/core';
import { GraphService } from './graph.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph-root',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  chart = [];

  constructor(private _weather: GraphService) {}

  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe(res => {

  const arr = JSON.parse(res['data']);

        const temp_max = arr.list;
        const temp_min = [0, 2, 4, 6];
        const alldates = arr.date;

        const weatherDates = [];
        alldates.forEach((res) => {
          const jsdate = new Date(res * 1000);
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}));
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
  }
}
