import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface ITool {
  parent   : string,
  name     : string,
  imgUrl   : string,
  isModule?: boolean
}

export class Tool {
  public parent  : string;
  public name    : string;
  public imgUrl  : string;
  public isModule: boolean;

  constructor(
    {
      parent,
      name,
      imgUrl,
      isModule = false
    }: ITool
  ) {
    this.parent   = parent;
    this.imgUrl   = imgUrl;
    this.name     = name;
    this.isModule = isModule;
  }

}

const tools: Tool[] = [
  new Tool({parent: null,name:"Milling",imgUrl:"milling"}),
  new Tool({parent: null,name:"Turning",imgUrl:"turning"}),
  new Tool({parent: null,name:"Hole Making",imgUrl:"hole-making"}),
  new Tool({parent: "milling",name: "Pocket",imgUrl: "milling-pocket"}),
  new Tool({parent: "milling",name: "Shoulder",imgUrl: ""}),
  new Tool({parent: "milling",name: "Slot",imgUrl: "milling-slot"}),
  new Tool({parent: "milling",name: "3D Profile Super class",imgUrl: "milling-3d-profile-super-class"}),
  new Tool({parent: "turning",name: "OD Planer Face",imgUrl: "turning-od-planner-face"}),
  new Tool({parent: "turning",name: "OD Cylinder",imgUrl: "turning-od-cylinder",isModule: true}),
  new Tool({parent: "turning",name: "OD Profile",imgUrl: "turning-od-profile",isModule: true}),
  new Tool({parent: "hole-making",name: "Simple Blind Hole",imgUrl: "holemaking-simple-blind-hole",isModule: true}),
  new Tool({parent: "hole-making",name: "Threaded Blind Hole",imgUrl: "holemaking-threaded-blind-hole",isModule: true}),
  new Tool({parent: "pocket",name: "General Closed Pocket",imgUrl: "pocket-general-closed-pocket",isModule: true}),
  new Tool({parent: "pocket",name: "General Open Pocket",imgUrl: "pocket-general-open-pocket",isModule: true}),
  new Tool({parent: "shoulder",name: "Straight Shoulder",imgUrl: "shoulder-straight-shoulder",isModule: true}),
  new Tool({parent: "shoulder",name: "Contoured Shoulder",imgUrl: "shoulder-contoured-shoulder",isModule: true}),
  new Tool({parent: "slot",name: "Curve Slot",imgUrl: "slot-curve-slot",isModule: true}),
  new Tool({parent: "slot",name: "T-Slot",imgUrl: "slot-t-slot",isModule: true}),
  new Tool({parent: "od-planer-face",name: "OD Planer Face From Solid",imgUrl: "od-planer-face-od-planer-face-from-solid",isModule: true}),
  new Tool({parent: "od-planer-face",name: "OD Planer Face From Tube",imgUrl: "od-planer-face-od-planer-face-from-tube",isModule: true}),
]


@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  /**
   * Returns all tools with given parent
   * @param parent 
   */
  GetToolsWithParent(parent:string): Observable<Tool[]> {
    const query = parent.split("%20").join("-").toLowerCase();
    return of(tools.filter(x=>x.parent == query));
 
  }

  GetBrandRoots() {
    return of(tools.filter(tool=>tool.parent==null));
  }
  constructor() { }
}
