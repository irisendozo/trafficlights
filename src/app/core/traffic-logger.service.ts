import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { interval } from 'rxjs/observable/interval';

import 'rxjs/add/operator/startWith';

import { TrafficControllerService } from './traffic-intersection-controller.service';

/**
 * Service that logs the intersection state every 1 minute and allows manual
 * logging of the last valid value of the intersection
 *
 * @export
 * @class TrafficLoggerService
 */
@Injectable()
export class TrafficLoggerService {
  /**
   * This is the clock that ticks every second and where `log` is subscribed to
   *
   * @export
   * @class TrafficLoggerService
   */
  private clock: Observable<number> = interval(60000).startWith(0);

  constructor(private trafficController: TrafficControllerService) { }

  /**
   * Activates the logging service and logs intersection status every 1 min
   *
   * @memberOf TrafficLoggerService
   */
  activateLogger() {
    this.clock.subscribe(() => { this.log(this.trafficController.intersection.getValue()); });
  }

  /**
   * Logs in the console the intersection input value with Date
   *
   * @param {Intersection} intersection
   *
   * @memberOf TrafficLoggerService
   */
  log(intersection: any) {
    let results = `---Traffic Status Update at ${new Date()}--- \n`;
    for (const section in intersection) {
      if (intersection.hasOwnProperty(section)) { results += `${section}: ${intersection[section]} \n`; }
    }
    console.log(results);
  }
}
