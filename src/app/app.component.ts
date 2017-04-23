import { Component, OnInit } from '@angular/core';

import { Light, Intersection } from './core/traffic.model';
import { CYCLE, TrafficControllerService } from './core/traffic-intersection-controller.service';
import { TrafficLoggerService } from './core/traffic-logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  /**
   * The model representation for the traffic lights on the view
   *
   * @memberOf AppComponent
   */
  private intersection: Intersection;

  constructor(
    private trafficController: TrafficControllerService,
    private trafficLogger: TrafficLoggerService,
  ) { }

  /**
   * Initialize the traffic controller and service logger to log the results on the console every
   * minute (and every after light change) and set the intersection light colors on the view
   *
   * @memberOf AppComponent
   */
  ngOnInit() {
    this.trafficLogger.activateLogger();
    this.trafficController.scheduler();
    this.trafficController.intersection
      .subscribe((intersection: Intersection) => {
        this.trafficLogger.log(intersection);
        this.intersection = intersection;
      });
  }
}
