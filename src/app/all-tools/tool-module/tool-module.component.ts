import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-tool-module',
  templateUrl: './tool-module.component.html',
  styleUrls: ['./tool-module.component.scss']
})
export class ToolModuleComponent implements OnInit {
  tileName: string;

  constructor(
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split("/");
    this.tileName = url[url.length-1].split("%20").join(" ");
  }

  home() {
    this.location.back();
  }
}
