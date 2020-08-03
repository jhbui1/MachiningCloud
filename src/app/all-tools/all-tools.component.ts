import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { ToolsService, Tool } from './tools.service';
import { Observable, of } from 'rxjs';
import { share,tap } from 'rxjs/operators';

@Component({
  selector: 'app-all-tools',
  templateUrl: './all-tools.component.html',
  styleUrls: ['./all-tools.component.scss']
})
export class AllToolsComponent implements OnInit {
  parentTiles: Tool[][] = []; //stores tiles for each level of filtering
  tools$:Observable<Tool[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toolsService: ToolsService
  ) { 
    router.events.subscribe((event:NavigationStart) => {
      if(event.navigationTrigger ==='popstate') {
        this.handleReverse();
      }
    })
  }
  
  ngOnInit(): void {
    const toolCat = this.lastSubRoute(this.router.url);
    this.filter(toolCat);
  }
  
  /**
   * returns last subroute
   * @param route 
   */
  lastSubRoute(route:string):string {
    const routeVals:string[] = route.split("/");
    return routeVals[routeVals.length-1];
  }

  /**
   * makes filter request to service
   * @param toolCategory 
   */
  filter(toolCategory:string) {
    const query = toolCategory.toLowerCase();
    console.log(query)
    this.tools$ = this.toolsService.GetToolsWithParent(query).pipe(
      tap((tools) => this.parentTiles.push(tools)),
      share()
    )
  }

  /**
   * appends categroy to route to pop on back arrow navigation 
   * and finds tools with given category
   * @param toolCategory 
   */
  onFilter(toolCategory:string) {
    this.router.navigate([toolCategory.toLowerCase()],{relativeTo: this.route});
    this.filter(toolCategory);
  }

  /**
   * Intercept back arrow, 
   * load parent tiles if they exist
   */
  handleReverse() {
    this.parentTiles.pop();
    this.tools$ = of(this.parentTiles[this.parentTiles.length-1]);
  }
 
}
