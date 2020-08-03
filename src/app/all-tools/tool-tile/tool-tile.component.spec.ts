import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTileComponent } from './tool-tile.component';

describe('ToolTileComponent', () => {
  let component: ToolTileComponent;
  let fixture: ComponentFixture<ToolTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
