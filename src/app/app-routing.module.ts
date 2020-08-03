import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  {
    path: 'tools/:category',
    pathMatch: 'prefix',
    loadChildren: () => import('./all-tools/all-tools.module').then(m => m.AllToolsModule)
  },
  { path: '**', component: HomeComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
