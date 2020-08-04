import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AllToolsComponent } from './all-tools.component';
import { Router } from '@angular/router';
import { ToolsService, Tool } from '../tools.service';
import { of } from 'rxjs';

describe('AllToolsComponent', () => {
  let component: AllToolsComponent;
  let fixture: ComponentFixture<AllToolsComponent>;
  let router: any;
  let toolService: ToolsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        AllToolsComponent
      ],
      providers: [
        ToolsService,
      ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
    router = TestBed.get(Router)
  }));

  beforeEach(inject([ToolsService], s => {
    fixture = TestBed.createComponent(AllToolsComponent);
    component = fixture.componentInstance;
  
    toolService = s
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('#filterByLastSubRoute()', () => {
    it('should return milling elements', () => {
      const response: Tool[] =  [
        new Tool({parent: "milling",name: "Pocket",imgUrl: "milling-pocket"}),
        new Tool({parent: "milling",name: "Shoulder",imgUrl: ""}),
        new Tool({parent: "milling",name: "Slot",imgUrl: "milling-slot"}),
        new Tool({parent: "milling",name: "3D Profile Super class",imgUrl: "milling-3d-profile-super-class"})
      ]
      spyOn(toolService,'GetToolsWithParent').and.returnValue(of(response))
      // @ts-ignore
      component.filterByLastSubRoute(['milling']);
      fixture.detectChanges();
      expect(document.getElementById('tools').children.length).toEqual(response.length);
    })

    it('should display home page for invalid filters', () => {
      const response: Tool[] = [];
      spyOn(toolService,'GetToolsWithParent').and.returnValue(of(response))
      const routerSpy = spyOn(router,'navigate')
      
      // @ts-ignore
      component.filterByLastSubRoute(['invalid-route']);
      fixture.detectChanges();
      expect(routerSpy).toHaveBeenCalledWith(['']);
    })
  })
});
