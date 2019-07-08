import { Component } from '@angular/core';
import { GraphService } from './graph.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'graph-root',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {

  chart = [];
  
  constructor(private _weather: GraphService) {}

  ngOnInit() {
    this._weather.dailyForecast()
      .subscribe(res => {

  let arr = JSON.parse(res['data'])

        let temp_max = arr.list
        let temp_min = [0, 2, 4, 6]
        let alldates = arr.date

        let weatherDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric'}))
        })

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
        })

      })
  }
}
