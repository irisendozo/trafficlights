import { Component, OnInit } from '@angular/core';

import { Light, Intersection } from './core/traffic-controller.model';
import { TrafficControllerService } from './core/traffic-controller.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit {
  private intersection: Intersection;

  constructor(private trafficController: TrafficControllerService) { }

  /**
   *
   *
   *
   * @memberOf AppComponent
   */
  ngOnInit() {
    this.trafficController.scheduler();
    this.trafficController.intersection
      .subscribe((intersection: Intersection) => this.intersection = intersection);
  }
}
