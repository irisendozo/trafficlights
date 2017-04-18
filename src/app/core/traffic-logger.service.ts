import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { interval } from 'rxjs/observable/interval';

import { Intersection } from './traffic-controller.model';
import { TrafficControllerService } from './traffic-controller.service';

/**
 *
 *
 * @export
 * @class TrafficLoggerService
 */
@Injectable()
export class TrafficLoggerService {
  /**
   *
   *
   * @export
   * @class TrafficLoggerService
   */
  private clock: Observable<number> = interval(60000);
  constructor(private trafficController: TrafficControllerService) {
    this.clock.subscribe(() => this.log(this.trafficController.intersection.getValue()));
  }

  /**
   *
   *
   * @param {Intersection} intersection
   *
   * @memberOf TrafficLoggerService
   */
  log(intersection: Intersection) {
    console.log(
      `${new Date()}
      ---Traffic Status Update---
      North: ${intersection.north}
      South: ${intersection.south}
      East: ${intersection.east}
      West: ${intersection.west}`
    );
  }

}
