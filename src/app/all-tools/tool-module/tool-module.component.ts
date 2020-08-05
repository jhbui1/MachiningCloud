import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToolsService, Tool } from 'src/app/tools.service';
import { Observable, Subscription } from 'rxjs';
import { tap, share, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-tool-module',
  templateUrl: './tool-module.component.html',
  styleUrls: ['./tool-module.component.scss']
})
export class ToolModuleComponent implements OnInit, OnDestroy {
  public tools$: Observable<Tool[]>

  private urlSubscription: Subscription | null = null;

  constructor(
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private toolsService: ToolsService
  ) { }

  public ngOnInit(): void {
    this.urlSubscription = this.route.url.subscribe( (urlSegments) => {
      this.retrieveModuleTool()
    })
  }

  public ngOnDestroy(): void {
    this.urlSubscription.unsubscribe();
  }

  public home() {
    this.location.back();
  }

  /**
   * Parses url to initiate service calls for verification of module name
   */
  private retrieveModuleTool() {
    const url = this.router.url.split("/");
    const moduleName = url[url.length-1]

    const toolsWithModuleNameAsName = this.toolsService.GetToolsWithName(moduleName);
    const toolsWithModuleNameAsParent = this.toolsService.GetToolsWithParent(moduleName);

    this.tools$ = this.verifyModuleTool(toolsWithModuleNameAsName,toolsWithModuleNameAsParent)
  }

  /**
   * verifies modulename is has exactyl one tool with matching name and is not a parent of any tools
   * @param toolsWithModuleNameAsName tools having given module name
   * @param toolsWithModuleNameAsParent tools having given module name as parent
   */
  private verifyModuleTool(toolsWithModuleNameAsName: Observable<Tool[]>, toolsWithModuleNameAsParent: Observable<Tool[]>): Observable<Tool[]> {
    return toolsWithModuleNameAsParent.pipe(
      switchMap( matchingParentTools => {
        return toolsWithModuleNameAsName.pipe(
          tap(matchingNamedTools => {
            if(matchingNamedTools.length != 1 || matchingParentTools.length != 0) {
              this.router.navigate(['not-found'])
            }
          }),
          share()
        )
      }));
  }

}
