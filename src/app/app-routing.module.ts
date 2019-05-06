import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LabSearchComponent } from 'src/app/laboratories/lab-search/lab-search.component';
import { LabListComponent } from 'src/app/laboratories/lab-list/lab-list.component';

const routes: Routes = [
  { path: 'laboratories', component: LabSearchComponent },
  { path: 'regulatory', component: LabListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
