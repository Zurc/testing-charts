import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { computedUsage } from '../computedUsage';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexStroke,
  ApexFill,
  ApexYAxis,
  // ApexTooltip,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexMarkers,
  ApexXAxis,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  markers: ApexMarkers;
  xaxis: any // ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  legend: ApexLegend;
  // tooltip: ApexTooltip;
};

@Component({
  selector: 'app-apex-chart',
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.scss']
})
export class ApexChartComponent implements OnInit, AfterViewInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions> | any;
  public categories:any[] = []
  public computedUsage = computedUsage.reverse();
  public chartWidth: any;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Total working hours",
          type: "line",
          data: this.computedUsage.map(
            (d) => d.workingHoursTotalInMinutes
          ),
          color: "#777777",
        },
        {
          name: "Inside working hours",
          type: "column",
          data: this.computedUsage.map((d) => d.insideHoursUsage),
          color: "#044c7e"
        },
        {
          name: "Outside working hours",
          type: "column",
          data: this.computedUsage.map((d) => d.outsideHoursUsage),
          color: "#ce122d"
        }
      ],
      chart: {
        type: "line",
        height: 350,
        zoom: {
          enabled: false
        },
        toolbar: {
          tools: {
            download: false
          }
        },
      },
      stroke: {
        curve: "stepline",
        dashArray: 7,
        width: [2, 0, 0],
        colors: ["#777777"]
      },
      title: {
        text: "Usage for selected date range"
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        type: "datetime",
        labels: {
          rotate: -90
        },
        // categories: this.categories,
        tickPlacement: "on"
      },
      yaxis: [{
        seriesName: "Total working hours",
        min: 0,
        max: 3456,
        tooltip: {
          enabled: true
        },
        labels: {
          formatter: function(y: number) {
            return y.toFixed(0)
          }
        }
      }],
      legend: {
        position: "top",
        width: 170,
        horizontalAlign: "left",
        offsetX: this.chartWidth,
        markers: {
          width: 16,
          height: 3,
          radius: 0
        }
      }
    };
  }

  ngOnInit(): void {
    this.chartWidth = window.innerWidth;
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    let sortedCategories = this.computedUsage
      .map(ceu => ceu.date)
      // .sort((a, b) => (+new Date(a)) - +new Date(b))
      .map(d => moment(d).format('DD/MM/YYYY'));

    setTimeout(() => {
      this.chartOptions.labels = sortedCategories;
    }, 0);
  }

  @HostListener('window:resize', ['$event'])
  resizeWindow() {
    this.chartWidth = window.innerWidth;
  }

}
