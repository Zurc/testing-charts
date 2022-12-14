import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestingChartsModule } from './charts/charts.module';

import { AppComponent } from './app.component';
import 'hammerjs';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    BrowserAnimationsModule,
    TestingChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
