import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { async } from 'rxjs/scheduler/async';

import { Light, Intersection, State, InitialState, Sequence } from './traffic-controller.model';

/**
 *
 *
 * @export
 * @class TrafficControllerService
 */
export let CYCLE = new InjectionToken<number>('traffic.cycle');

/**
 *
 *
 * @export
 * @class TrafficControllerService
 */
@Injectable()
export class TrafficControllerService {
  /**
   *
   *
   * @export
   * @class TrafficControllerService
   */
  public intersection = new BehaviorSubject({ north: 'green', south: 'green', east: 'red', west: 'red' } as Intersection);
  constructor(@Inject(CYCLE) private cycle: number) { }

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
        this.intersection.next({ north: 'green', south: 'green', east: 'red', west: 'red' } as Intersection);
        return [this.getNextState(State.GreenRed), this.getDurationFor('green')];
      case State.YellowRed:
        this.intersection.next({ north: 'yellow', south: 'yellow', east: 'red', west: 'red' } as Intersection);
        return [this.getNextState(State.YellowRed), this.getDurationFor('yellow')];
      case State.RedGreen:
        this.intersection.next({ north: 'red', south: 'red', east: 'green', west: 'green' } as Intersection);
        return [this.getNextState(State.RedGreen), this.getDurationFor('green')];
      case State.RedYellow:
        this.intersection.next({ north: 'red', south: 'red', east: 'yellow', west: 'yellow' } as Intersection);
        return [this.getNextState(State.RedYellow), this.getDurationFor('yellow')];
      default:
        throw new Error(`Invalid State:${currentState}`);
    };
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
   * @private
   * @param {Light} light
   * @returns {number}
   *
   * @memberOf TrafficControllerService
   */
  private getDurationFor(light: Light): number {
    const yellow = this.cycle / 10;

    switch (light) {
      case 'red':
        return this.cycle;
      case 'green':
        return this.cycle - yellow;
      case 'yellow':
        return yellow;
      default:
        throw new Error(`Invalid State:${light}`);
    }
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
