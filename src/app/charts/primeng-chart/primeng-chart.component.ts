import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { computedUsage } from '../computedUsage';

@Component({
  selector: 'app-primeng-chart',
  templateUrl: './primeng-chart.component.html',
  styleUrls: ['./primeng-chart.component.scss']
})
export class PrimengChartComponent implements OnInit {
  data: any;
  chartOptions: any;
  public computedUsage = computedUsage;


  constructor() {
    let sortedCategories = this.computedUsage
      .map(ceu => ceu.date)
      // .sort((a, b) => (+new Date(a)) - +new Date(b))
      .map(d => moment(d).format('DD/MM/YYYY'));

    setTimeout(() => {
      // this.chartOptions.labels = sortedCategories;
    }, 0);
   }

  ngOnInit(): void {
    this.data = {
      labels: this.computedUsage.map(d => moment(d.date).format('DD/MM/YYYY')),
      datasets: [
        {
          type: 'line',
          borderDash: [7, 8],
          label: 'Total working hours',
          borderColor: '#777777',
          borderWidth: 2,
          fill: false,
          pointStyle: "dash",
          stepped: 'middle',
          data: this.computedUsage.map(
            (d) => d.workingHoursTotalInMinutes
          ),
        },
        {
          label: 'Inside working hours',
          backgroundColor: '#044c7e',
          data: this.computedUsage.map((d) => d.insideHoursUsage),
        },
        {
          label: 'Outside working hours',
          backgroundColor: '#ce122d',
          data: this.computedUsage.map((d) => d.outsideHoursUsage),
        },
      ],
    };
    this.chartOptions = {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          align: 'start',
          text: 'Usage for selected date range',
        },
        legend: {
          position: "top",
          labels: {
            boxHeight: 3,
            boxWidth: 15,
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
            callback: (label: string, index: any, labels: any) => {
              return label + ' hrs';
            },
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }

}
