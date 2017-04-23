/**
 * This depicts the specific light states
 *
 * @export
 * @class TrafficControllerService
 */
export type Light = 'red' | 'yellow' | 'green';

/**
 * This depicts an intersection with a specific state of light
 *
 * @export
 * @class TrafficControllerService
 */
export interface Intersection { north: Light; south: Light; east: Light; west: Light; };

/**
 * This depicts each state of light on the intersection:
 * `GreenRed` - North: Green, South: Green, East: Red, West: Red
 * `YellowRed` - North: Yellow, South: Yellow, East: Red, West: Red
 * `RedGreen` - North: Red, South: Red, East: Green, West: Green
 * `RedYellow` - North: Red, South: Red, East: Yellow, West: Yellow
 *
 * @export
 * @class TrafficControllerService
 */
export enum State { GreenRed, YellowRed, RedGreen, RedYellow };

/**
 * This depicts the initial state lights on the intersection
 *
 * @export
 * @class TrafficControllerService
 */
export const InitialState = State.GreenRed;

/**
 * This depicts the sequence of state light changes on the intersection
 *
 * @export
 * @class TrafficControllerService
 */
export const Sequence = [State.GreenRed, State.YellowRed, State.RedGreen, State.RedYellow];
