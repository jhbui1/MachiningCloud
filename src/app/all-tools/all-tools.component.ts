import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ToolsService, Tool } from '../tools.service';
import { Observable, Subscription } from 'rxjs';

interface Breadcrumb {
	name: string;
	path: string;
}

@Component({
  selector: 'app-all-tools',
  templateUrl: './all-tools.component.html',
  styleUrls: ['./all-tools.component.scss']
})
export class AllToolsComponent implements OnInit,OnDestroy {
  public tools$        : Observable<Tool[]>;
  public filterPath    : Breadcrumb[];

  private allToolsRoot   : string = "/tools/search";
  private urlSubscription: Subscription | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toolsService: ToolsService
  ) { 
    this.urlSubscription = null;
  }
  
  public ngOnInit(): void {
    this.urlSubscription = this.route.url.subscribe( (urlSegments) => {
      const segmentStrs = urlSegments.map(
        (segment) => {
          return decodeURIComponent(segment.path);
        }
      )
      this.filterByLastSubRoute(segmentStrs);
    })
  }

  public ngOnDestroy() {
    this.urlSubscription.unsubscribe();
  }
  
 /**
   * handles emissions from tile components
   * appends categroy to route to pop on back arrow navigation 
   * and finds tools with given category
   * navigates to module component if when module is reached
   * @param toolCategory 
   */
  public onFilter(event: { isModule: boolean; name: string; }) {
    if(!event.isModule) {
      this.router.navigate([event.name.toLowerCase()],{relativeTo: this.route});
    } else {
      this.router.navigate(['tools/module/'+event.name])
    }
  }

  /**
   * triggered by change in url 
   * @param urlSegments decoded uri segments
   */
  private filterByLastSubRoute(urlSegments:string[]=[]) {
    this.getBreadCrumbs(urlSegments);
    const toolCat = this.lastSubRoute(urlSegments);
    this.filter(toolCat);
  }

  /**
   * returns last subroute in current url
   * @param urlSegments 
   */
  private lastSubRoute(urlSegments:string[]):string {
    return urlSegments[urlSegments.length-1];
  }

  /**
   * makes filter request to service
   * @param toolCategory 
   */
  private filter(toolCategory:string) {
    const query = toolCategory.toLowerCase();
    this.tools$ = this.toolsService.GetToolsWithParent(query);
  }
 
  /**
   * parse url to display in template 
   * to jump multiple levels of filters
   * @param urlSegments 
   */
  private getBreadCrumbs(urlSegments: string[]) {
    var runningPath = this.allToolsRoot;
    this.filterPath = urlSegments.map( (name) => {
      runningPath += ("/" + encodeURIComponent(name));
      return ({ 
        name: "| "+name,
        path: runningPath
      })
    })
  }

}
