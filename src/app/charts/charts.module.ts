import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from '@progress/kendo-angular-charts';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartModule } from 'primeng/chart';
import { NgApexchartsModule } from 'ng-apexcharts'

import { ChartsComponent } from './charts.component';

import { KendoChartComponent } from './kendo-chart/kendo-chart.component';
import { PrimengChartComponent } from './primeng-chart/primeng-chart.component';
import { ApexChartComponent } from './apex-chart/apex-chart.component';



@NgModule({
  declarations: [
    ChartsComponent,
    KendoChartComponent,
    ApexChartComponent,
    PrimengChartComponent
  ],
  imports: [
    CommonModule,
    ChartsModule,
    ChartsRoutingModule,
    NgApexchartsModule,
    ChartModule
  ]
})
export class TestingChartsModule { }
