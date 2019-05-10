import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryListComponent } from './history/history-list/history-list.component';
import { LabListComponent } from './laboratories/lab-list/lab-list.component';
import { RegulatoryListComponent } from './/regulatory/regulatory-list/regulatory-list.component';

const routes: Routes = [
  { path: 'laboratories', component: LabListComponent },
  { path: 'regulatory', component: RegulatoryListComponent },
  { path : 'history', component: HistoryListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
