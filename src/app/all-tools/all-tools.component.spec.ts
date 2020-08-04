import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllToolsComponent } from './all-tools.component';

describe('AllToolsComponent', () => {
  let component: AllToolsComponent;
  let fixture: ComponentFixture<AllToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('#lastSubRoute()',() => {
    it('should return string after last "/" in url', () => {
      expect(component.lastSubRoute('http://localhost:4200/tools/milling')).toEqual('milling')
    })
    it('should return string after last "/" in url', () => {
      expect(component.lastSubRoute('http://localhost:4200/tools')).toEqual('tools')
    })
  })
});
