import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllToolsComponent } from './all-tools.component';
import { ToolModuleComponent } from './tool-module/tool-module.component';
import { NotFoundComponent } from '../not-found/not-found.component';

const routes: Routes = [
  {
    path: 'module/:id',
    component: ToolModuleComponent
  },
  { 
    path: 'search',
    children:[
      {
        path:'**',
        component: AllToolsComponent
      }
    ]
  },
  {
    path:"**", 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllToolsRoutingModule { }
