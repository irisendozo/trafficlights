import { Component, OnInit } from '@angular/core';

import { Light, Intersection } from './core/traffic-controller.model';
import { CYCLE, TrafficControllerService } from './core/traffic-controller.service';
import { TrafficLoggerService } from './core/traffic-logger.service';

import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  providers: [
    TrafficControllerService,
    TrafficLoggerService,
    { provide: CYCLE, useValue: environment.cycle },
  ],
})
export class AppComponent implements OnInit {
  private intersection: Intersection;

  constructor(
    private trafficController: TrafficControllerService,
    private trafficLogger: TrafficLoggerService,
  ) { }

  /**
   *
   *
   *
   * @memberOf AppComponent
   */
  ngOnInit() {
    this.trafficController.scheduler();
    this.trafficController.intersection
      .subscribe((intersection: Intersection) => {
        this.trafficLogger.log(intersection);
        this.intersection = intersection;
      });
  }
}
