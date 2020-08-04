import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tool-tile',
  templateUrl: './tool-tile.component.html',
  styleUrls: ['./tool-tile.component.scss']
})
export class ToolTileComponent implements OnInit {

  @Output() filtered = new EventEmitter<{name: string,isModule: boolean}>();

  _imgUrl: string;

  @Input() set imgUrl(value:string) {
    this._imgUrl = value
  }  
  @Input() tileName: string;
  @Input() isModule: boolean;
  
  constructor(
  ) { }

  ngOnInit(): void {
  }

  filter() {
    this.filtered.emit({name: this.tileName,isModule: this.isModule});
  }

}
