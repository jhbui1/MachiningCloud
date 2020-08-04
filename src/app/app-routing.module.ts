import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'tools',
    pathMatch: 'prefix',
    loadChildren: () => import('./all-tools/all-tools.module').then(m => m.AllToolsModule)
  },
  {
    path:'',
    component: HomeComponent
  },
  {
    path: '**', component: NotFoundComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
