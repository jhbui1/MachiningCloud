import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tool-module',
  templateUrl: './tool-module.component.html',
  styleUrls: ['./tool-module.component.scss']
})
export class ToolModuleComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('module')
  }

  home() {
  }
}
