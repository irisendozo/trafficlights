import { TestBed, inject } from '@angular/core/testing';

import { TrafficControllerService } from './traffic-controller.service';

describe('TrafficControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrafficControllerService]
    });
  });

  it('should ...', inject([TrafficControllerService], (service: TrafficControllerService) => {
    expect(service).toBeTruthy();
  }));
});
