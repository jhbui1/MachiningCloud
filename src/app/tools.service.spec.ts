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
