import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CategoryAxis, ChartComponent } from '@progress/kendo-angular-charts';
import * as moment from 'moment';
import { computedUsage } from '../computedUsage';

@Component({
  selector: 'kendo-test-chart',
  templateUrl: './kendo-chart.component.html',
  styleUrls: ['./kendo-chart.component.scss']
})
export class KendoChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartTitle: any = { text: 'Usage for selected date range' };
  public chartWidth: any;
  public showInHours = true;
  public categories:string[] = []
  public legendXPosition = 0;
  public computedUsage = computedUsage;

  public categoryAxis = {
    categories: this.categories,
    type: 'date',
    labels: {
      dateFormats: {
        days: 'dd/MM/y'
      },
      rotation: 90,
      step: 1
    }
  } as CategoryAxis

  public valueAxis = {
    max: 3456,
    min: 0,
    labels: {
      format: this.getValueFormat()
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.chartWidth = window.innerWidth;
    this.legendXPosition = this.chartWidth - 190
  }

  ngAfterViewInit(): void {
    this.computedUsage.map(cat => {
      this.categories.push(moment(new Date(cat.date)).format('YYYY/MM/DD'));
    })
  }

  @HostListener('window:resize', ['$event'])
  resizeWindow() {
    this.chartWidth = window.innerWidth;

    this.legendXPosition = this.chartWidth - 190
  }

  public getValueFormat(): string {
    return "{0} hrs";
  }

  public getInsideFormat(): string {
    return this.showInHours
      ? "{0} " + "hours usage inside working hours"
      : "{0} " + "minutes usage inside working hours";
  }

}

