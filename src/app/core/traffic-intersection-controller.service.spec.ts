import { TestBed, inject } from '@angular/core/testing';
import { TestScheduler } from 'rxjs/testing/TestScheduler';

import { CYCLE, TrafficControllerService } from './traffic-intersection-controller.service';
import { Intersection } from './traffic.model';

describe('TrafficControllerService', () => {
  let trafficControllerService: TrafficControllerService;
  const cycle = 5;
  const cycleMs = cycle * 60000;
  const yellowCycle = cycleMs / 10;
  const greenCycle = cycleMs - yellowCycle;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrafficControllerService,
        { provide: CYCLE, useValue: cycle },
      ]
    });

    trafficControllerService = TestBed.get(TrafficControllerService);
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create the traffic controller service', () => {
    expect(trafficControllerService).toBeTruthy();
  });

  it('should initialize to green-green-red-red', () => {
    let resp: Intersection;
    trafficControllerService.intersection.subscribe((response: Intersection) => resp = response);

    expect(resp).toEqual({ north: 'green', south: 'green', east: 'red', west: 'red' });
  });

  describe('Method: scheduler()', () => {
    beforeEach(() => {
      trafficControllerService.scheduler();
    });

    it('should set next state to yellow-yellow-red-red', () => {
      let resp: Intersection;
      jasmine.clock().tick(greenCycle);
      trafficControllerService.intersection.subscribe((response: Intersection) => resp = response);

      expect(resp).toEqual({ north: 'yellow', south: 'yellow', east: 'red', west: 'red' });
    });

    it('should set next state to red-red-green-green', () => {
      let resp: Intersection;
      jasmine.clock().tick(greenCycle);
      jasmine.clock().tick(yellowCycle);
      trafficControllerService.intersection.subscribe((response: Intersection) => resp = response);

      expect(resp).toEqual({ north: 'red', south: 'red', east: 'green', west: 'green' });
    });

    it('should set next state to red-red-yellow-yellow', () => {
      let resp: Intersection;
      jasmine.clock().tick(greenCycle);
      jasmine.clock().tick(yellowCycle);
      jasmine.clock().tick(greenCycle);
      trafficControllerService.intersection.subscribe((response: Intersection) => resp = response);

      expect(resp).toEqual({ north: 'red', south: 'red', east: 'yellow', west: 'yellow' });
    });
  });
});
