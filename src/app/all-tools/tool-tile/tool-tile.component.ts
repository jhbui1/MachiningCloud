import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tool-tile',
  templateUrl: './tool-tile.component.html',
  styleUrls: ['./tool-tile.component.scss']
})
export class ToolTileComponent implements OnInit {

  @Output() filtered = new EventEmitter<string>();

  _imgUrl: string;

  @Input() set imgUrl(value:string) {
    this._imgUrl = value
  }  
  @Input() tileName: string;
  
  constructor() { }

  ngOnInit(): void {
  }

  filter() {
    this.filtered.emit(this.tileName);
  }

}
