import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllToolsComponent } from './all-tools.component';
import { ToolModuleComponent } from './tool-module/tool-module.component';

const routes: Routes = [
  {
    path: 'module/:id',
    component: ToolModuleComponent
  },
  { 
    path: ':cat',
    children:[
      {
        path:'**',
        component: AllToolsComponent
      }
    ],
    component: AllToolsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllToolsRoutingModule { }
