import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolsService, Tool } from '../all-tools/tools.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tiles$: Observable<Tool[]>;

  constructor(
    private toolService: ToolsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tiles$ = this.toolService.GetBrandRoots();
  }

  navigateTo(route:string)
  {
    this.router.navigate(['tools/'+route]);
  }
}
