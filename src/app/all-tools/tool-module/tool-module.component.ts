import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToolsService, Tool } from 'src/app/tools.service';
import { Observable } from 'rxjs';
import { tap, share, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tool-module',
  templateUrl: './tool-module.component.html',
  styleUrls: ['./tool-module.component.scss']
})
export class ToolModuleComponent implements OnInit {
  tileName: string;
  tools$: Observable<Tool[]>

  constructor(
    private location: Location,
    private router: Router,
    private toolsService: ToolsService
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split("/");
    const moduleName = url[url.length-1]

    debugger;
    const toolsWithModuleNameAsName = this.toolsService.GetToolsWithName(moduleName);
    const toolsWithModuleNameAsParent = this.toolsService.GetToolsWithParent(moduleName);

    this.tools$ = toolsWithModuleNameAsParent.pipe(
      switchMap( matchingParentTools => {
        return toolsWithModuleNameAsName.pipe(
          tap(matchingNamedTools => {
            debugger;
            if(matchingNamedTools.length != 1 || matchingParentTools.length !=0) {//module should have unique name and should not be a parent
              this.router.navigate(['not-found'])
            }
          }),
          share()
        )
      })
    )

  }

  home() {
    this.location.back();
  }
}
