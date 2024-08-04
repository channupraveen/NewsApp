import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewListComponent } from './view-list/view-list.component';

const routes: Routes = [
  { path: 'view-list', component: ViewListComponent },
  { path: 'view-list/:type', component: ViewListComponent },
  { path: '', redirectTo: 'view-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }