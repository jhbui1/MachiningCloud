import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToolsService, Tool } from './tools.service';
import { Observable, of } from 'rxjs';
import { share,tap } from 'rxjs/operators';

@Component({
  selector: 'app-all-tools',
  templateUrl: './all-tools.component.html',
  styleUrls: ['./all-tools.component.scss']
})
export class AllToolsComponent implements OnInit,OnDestroy {
  parentTiles: Tool[][] = []; //stores tiles for each level of filtering
  tools$:Observable<Tool[]>;
  isModule: boolean = false;
  routerListener: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toolsService: ToolsService
  ) { 
    this.routerListener = router.events.subscribe((event:NavigationEnd) => {
      this.handleReverse();
    })
  }
  
  ngOnInit(): void {
    this.filterByLastSubRoute();
  }

  ngOnDestroy() {
    this.routerListener.unsubscribe();
  }
  
  filterByLastSubRoute() {
    const toolCat = this.lastSubRoute(this.router.url);
    this.filter(toolCat);
  }

  /**
   * returns last subroute in current url
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
  onFilter(event) {
    this.isModule = event.isModule;
    if(!this.isModule) {
      this.filter(event.name);
      this.router.navigate([event.name.toLowerCase()],{relativeTo: this.route});
    } else {
      this.router.navigate(['tools/module/'+event.name])
      this.parentTiles = [];
    }
  }

  handleReverse() {
    if(this.parentTiles.length == 0) {
      this.filterByLastSubRoute();
    } else {
      this.tools$ = of(this.parentTiles.pop());
    }
  }

}
