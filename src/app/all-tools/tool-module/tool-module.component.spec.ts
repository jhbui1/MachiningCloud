import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ToolModuleComponent } from './tool-module.component';
import { ToolsService, Tool } from 'src/app/tools.service';
import { of } from 'rxjs';

describe('ToolModuleComponent', () => {
  let component: ToolModuleComponent;
  let fixture: ComponentFixture<ToolModuleComponent>;
  let toolService: ToolsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolModuleComponent ],
      providers: [
        ToolsService
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(inject([ToolsService], s => {
    fixture = TestBed.createComponent(ToolModuleComponent);
    component = fixture.componentInstance;
    toolService = s;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#retrieveModuleTool()', () => {
    it('should not display a module name before verification', () => {
      expect(document.getElementById('module-name')).toBeNull();
    })

    it('should return if module name matches 1 tool with no children', () => {
      const nameResp = [new Tool({parent: "t-slot",name: "z-Slot",imgUrl: "slot-t-slot",isModule: true})];
      const childrenResp = [];
      spyOn(toolService,'GetToolsWithName').and.returnValue(of(nameResp));
      spyOn(toolService,'GetToolsWithParent').and.returnValue(of(childrenResp));
      // @ts-ignore
      component.retrieveModuleTool();
      fixture.detectChanges();
      expect(document.getElementById('module-name')).toBeTruthy();
    })

    it('should return to previous page if invalid module name is entered if it does not match 1 tool or has children', () => {
      const nameResp = [new Tool({parent: "t-slot",name: "z-Slot",imgUrl: "slot-t-slot",isModule: true})];
      const childrenResp = [new Tool({parent: "t-slot",name: "z-Slot",imgUrl: "slot-t-slot",isModule: true})];
      let homeSpy = spyOn(component,'home');
      spyOn(toolService,'GetToolsWithName').and.returnValue(of(nameResp));
      spyOn(toolService,'GetToolsWithParent').and.returnValue(of(childrenResp));

      // @ts-ignore
      component.retrieveModuleTool();
      fixture.detectChanges();
      expect(homeSpy).toHaveBeenCalled();
    })
  })
});
