import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllToolsComponent } from './all-tools.component';

const routes: Routes = [
  { path: '',
    children: 
    [{path:'**', component:AllToolsComponent}], 
    component: AllToolsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllToolsRoutingModule { }
