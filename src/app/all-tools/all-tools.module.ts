import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllToolsRoutingModule } from './all-tools-routing.module';
import { AllToolsComponent } from './all-tools.component';
import { ToolTileComponent } from './tool-tile/tool-tile.component';


@NgModule({
  declarations: [
    AllToolsComponent, 
    ToolTileComponent
  ],
  imports: [
    CommonModule,
    AllToolsRoutingModule
  ]
})
export class AllToolsModule { }
