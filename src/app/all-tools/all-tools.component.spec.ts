import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AllToolsComponent } from './all-tools.component';
import { Router } from '@angular/router';

describe('AllToolsComponent', () => {
  let component: AllToolsComponent;
  let fixture: ComponentFixture<AllToolsComponent>;
  let router: Router;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllToolsComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
    router = TestBed.get(Router)
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllToolsComponent);
    component = fixture.componentInstance;
    spy = spyOn(component,'filterByLastSubRoute');
    
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

  describe('#handleReverse()',() => {
    it('should call filterByLastSubroute if cache is empty', () => {
      router.navigate(['tools/milling/shoulder']);
      expect(spy).toHaveBeenCalled();
    })

    // it('should pop cache layer if it exists') {

    // }

    // it('should have an empty cache after reaching a module', () => {

    // })

  })
});
