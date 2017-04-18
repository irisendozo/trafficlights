/**
 *
 *
 * @export
 * @class TrafficControllerService
 */
export type Light = 'red' | 'yellow' | 'green';
/**
 *
 *
 * @export
 * @class TrafficControllerService
 */
export interface Intersection { north: Light; south: Light; east: Light; west: Light; };
/**
 *
 *
 * @export
 * @class TrafficControllerService
 */
export enum State { GreenRed, YellowRed, RedGreen, RedYellow };
/**
 *
 *
 * @export
 * @class TrafficControllerService
 */
export const InitialState = State.GreenRed;
/**
 *
 *
 * @export
 * @class TrafficControllerService
 */
export const Sequence = [State.GreenRed, State.YellowRed, State.RedGreen, State.RedYellow];
