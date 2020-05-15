import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolSliderComponent } from './tool-slider.component';

describe('ToolSliderComponent', () => {
  let component: ToolSliderComponent;
  let fixture: ComponentFixture<ToolSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
