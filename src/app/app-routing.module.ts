import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.TestingChartsModule) },
  { path: '**', redirectTo: 'charts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
