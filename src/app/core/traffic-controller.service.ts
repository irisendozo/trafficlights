import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { async } from 'rxjs/scheduler/async';

import {
  Light, Intersection,
  State, InitialState, Sequence
} from './traffic-controller.model';
const cycle = 10000;

/**
 *
 *
 * @export
 * @class TrafficControllerService
 */
@Injectable()
export class TrafficControllerService {
  public intersection = new BehaviorSubject({ north: 'green', south: 'green', east: 'red', west: 'red' });
  constructor() { }

  /**
   *
   *
   * @private
   * @param {State} currentState
   * @returns {Array<State>}
   *
   * @memberOf TrafficControllerService
   */
  private controller(currentState: State): Array<State> {
    switch (currentState) {
      case State.GreenRed:
        this.intersection.next({ north: 'green', south: 'green', east: 'red', west: 'red' });
        return [this.getNextState(State.GreenRed), this.getDurationFor('green')];
      case State.YellowRed:
        this.intersection.next({ north: 'yellow', south: 'yellow', east: 'red', west: 'red' });
        return [this.getNextState(State.YellowRed), this.getDurationFor('yellow')];
      case State.RedGreen:
        this.intersection.next({ north: 'red', south: 'red', east: 'green', west: 'green' });
        return [this.getNextState(State.RedGreen), this.getDurationFor('green')];
      case State.RedYellow:
        this.intersection.next({ north: 'red', south: 'red', east: 'yellow', west: 'yellow' });
        return [this.getNextState(State.RedYellow), this.getDurationFor('yellow')];
      default:
        throw new Error(`Invalid State:${currentState}`);
    };
  }

  /**
   *
   *
   * @private
   * @param {Light} light
   * @returns {number}
   *
   * @memberOf TrafficControllerService
   */
  private getDurationFor(light: Light): number {
    const yellow = cycle / 10;

    switch (light) {
      case 'red':
        return cycle;
      case 'green':
        return cycle - yellow;
      case 'yellow':
        return yellow;
      default:
        throw new Error(`Invalid State:${light}`);
    }
  }

  /**
   *
   *
   * @private
   * @param {State} currentState
   * @returns {State}
   *
   * @memberOf TrafficControllerService
   */
  private getNextState(currentState: State): State {
    return Sequence.indexOf(currentState) < 3 ?
      Sequence.indexOf(currentState) + 1 : 0;
  }

  /**
   *
   *
   *
   * @memberOf TrafficControllerService
   */
  scheduler() {
    const appContext = this;

    function doScheduledTask(state: State = InitialState) {
      this.schedule(...appContext.controller(state));
    }
    async.schedule(doScheduledTask);
  }

}
