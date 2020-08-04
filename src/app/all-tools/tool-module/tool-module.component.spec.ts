import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolModuleComponent } from './tool-module.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ToolModuleComponent', () => {
  let component: ToolModuleComponent;
  let fixture: ComponentFixture<ToolModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolModuleComponent ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
