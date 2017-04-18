import { TestBed, inject } from '@angular/core/testing';

import { TrafficLoggerService } from './traffic-logger.service';

describe('TrafficLoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrafficLoggerService]
    });
  });

  it('should ...', inject([TrafficLoggerService], (service: TrafficLoggerService) => {
    expect(service).toBeTruthy();
  }));
});
