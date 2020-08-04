import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllToolsRoutingModule } from './all-tools-routing.module';
import { AllToolsComponent } from './all-tools.component';
import { ToolTileComponent } from './tool-tile/tool-tile.component';
import { ToolModuleComponent } from './tool-module/tool-module.component';


@NgModule({
  declarations: [
    AllToolsComponent, 
    ToolTileComponent, 
    ToolModuleComponent
  ],
  imports: [
    CommonModule,
    AllToolsRoutingModule
  ]
})
export class AllToolsModule { }
