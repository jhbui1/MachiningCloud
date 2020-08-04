import { TestBed } from '@angular/core/testing';

import { ToolsService } from './tools.service';

interface ITool {
  parent: string,
  name: string,
  imgUrl: string,
  isModule?: boolean
}

class Tool {
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

describe('ToolsService', () => {
  let service: ToolsService;

  beforeEach(() => {
    const tools: Tool[] = [
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
      new Tool({parent: "slot",name: "T-Slot",imgUrl: "slot-t-slot",isModule: false}),
      new Tool({parent: "t-slot",name: "b-Slot",imgUrl: "slot-t-slot",isModule: true}),
      new Tool({parent: "od-planer-face",name: "OD Planer Face From Solid",imgUrl: "od-planer-face-od-planer-face-from-solid",isModule: true}),
      new Tool({parent: "od-planer-face",name: "OD Planer Face From Tube",imgUrl: "od-planer-face-od-planer-face-from-tube",isModule: true}),
    ]
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe("#GetToolsWithParent()", () => {
    let response;
    it('should should filter tools by parent name', ()=> {
    
      const toolsObservable = service.GetToolsWithParent('milling').subscribe((resp)=>{
        expect(resp.length).toEqual(4);
      });
    })
    it('should should filter tools by parent name', ()=> {
      const toolsObservable = service.GetToolsWithParent('turning').subscribe((resp)=>{
        expect(resp.length).toEqual(3);
      });
    }) 
  })
 
});
