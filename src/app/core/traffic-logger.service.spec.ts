import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';

import { TrafficLoggerService } from './traffic-logger.service';
import { CYCLE, TrafficControllerService } from './traffic-intersection-controller.service';

describe('TrafficLoggerService', () => {
  let trafficLoggerService: TrafficLoggerService;
  const cycle = 5;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrafficLoggerService,
        TrafficControllerService,
        { provide: CYCLE, useValue: cycle },
      ]
    });

    trafficLoggerService = TestBed.get(TrafficLoggerService);
    trafficLoggerService.log = jasmine.createSpy('log');
    trafficLoggerService.activateLogger();

    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should create the traffic logger service', () => {
    expect(trafficLoggerService).toBeTruthy();
  });

  it('should call `log` every minute', () => {
    jasmine.clock().tick(60000);
    expect(trafficLoggerService.log).toHaveBeenCalled();
  });
});
