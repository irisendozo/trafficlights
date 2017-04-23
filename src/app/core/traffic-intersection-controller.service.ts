import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { async } from 'rxjs/scheduler/async';

import { Light, Intersection, State, InitialState, Sequence } from './traffic.model';

/**
 * Token for state cycle (in minutes)
 *
 * @export
 * @class TrafficControllerService
 */
export const CYCLE = new InjectionToken<number>('traffic.cycle');

/**
 * Controls the state change of light controllers on an intersection. Note that this is very specific to an intersection
 * with North-South-East-West lights. It also assumes that North and South lights will always have the same state, and
 * the same goes for East and West lights.
 *
 * @export
 * @class TrafficControllerService
 */
@Injectable()
export class TrafficControllerService {
  /**
   * Event object that emits the last valid value when subscribed to, it emits the last emitted Intersection value
   *
   * @export
   * @class TrafficControllerService
   */
  public intersection = new BehaviorSubject({ north: 'green', south: 'green', east: 'red', west: 'red' } as Intersection);

  constructor(@Inject(CYCLE) private cycle: number) {
    // Convert cycle (in mins) to milliseconds
    this.cycle = this.cycle * 60000;
  }

  /**
   * Central logic that sets the next state of the traffic lights. It triggers the `intersection` subject to have a new value
   * according to the new current state, assigns a new next state according to the Sequence model and sets the schedule to change
   * to it after a set duration
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
        throw new Error(`Invalid State: ${currentState}`);
    };
  }

  /**
   * Gets the next state according to Sequence. If it exceeds more than the set sequence, restart to state 0
   *
   * @private
   * @param {State} currentState
   * @returns {State}
   *
   * @memberOf TrafficControllerService
   */
  private getNextState(currentState: State): State {
    return Sequence.indexOf(currentState) < (Sequence.length - 1) ? Sequence.indexOf(currentState) + 1 : 0;
  }

  /**
   * Gets the total millisecond duration that a state should stay depending on the input cycle in milliseconds
   *
   * @private
   * @param {Light} light
   * @returns {number}
   *
   * @memberOf TrafficControllerService
   */
  private getDurationFor(light: Light): number {
    const yellow =  this.cycle / 10;

    switch (light) {
      case 'red':
        return this.cycle;
      case 'green':
        return this.cycle - yellow;
      case 'yellow':
        return yellow;
      default:
        throw new Error(`Invalid State: ${light}`);
    }
  }

  /**
   * Activates the scheduled light change state according to this.controller
   *
   * @memberOf TrafficControllerService
   */
  scheduler() {
    const appContext = this;

    function changeLightState(state: State = InitialState) {
      this.schedule(...appContext.controller(state));
    }
    async.schedule(changeLightState);
  }

}
