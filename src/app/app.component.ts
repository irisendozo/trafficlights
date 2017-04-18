import { Component, OnInit } from '@angular/core';

import { Light, Intersection } from './core/traffic-controller.model';
import { CYCLE, TrafficControllerService } from './core/traffic-controller.service';
import { TrafficLoggerService } from './core/traffic-logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  /**
   * The model for the traffic lights on the view
   *
   * @memberOf AppComponent
   */
  private intersection: Intersection;

  constructor(
    private trafficController: TrafficControllerService,
    private trafficLogger: TrafficLoggerService,
  ) { }

  /**
   * Initialize the traffic controller and set up the subscribers of the intersection
   * by logging the results on the console and setting the resulting lights on
   * the view
   *
   * @memberOf AppComponent
   */
  ngOnInit() {
    this.trafficController.scheduler();
    // Once the intersection subject is ready with a new value, log it and
    // set it to the view
    this.trafficController.intersection
      .subscribe((intersection: Intersection) => {
        this.trafficLogger.log(intersection);
        this.intersection = intersection;
      });
  }
}
