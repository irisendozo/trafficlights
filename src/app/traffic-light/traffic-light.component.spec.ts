import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';

import { TrafficLightComponent } from './traffic-light.component';

describe('TrafficLightComponent', () => {
  let component: TrafficLightComponent;
  let fixture: ComponentFixture<TrafficLightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TrafficLightComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the traffic light component', () => {
    expect(component).toBeTruthy();
  });
});
