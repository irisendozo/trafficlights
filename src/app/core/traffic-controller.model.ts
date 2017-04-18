export type Light = 'red' | 'yellow' | 'green';
export interface Intersection { north: Light; south: Light; east: Light; west: Light; };
export enum State { GreenRed, YellowRed, RedGreen, RedYellow };
export const InitialState = State.GreenRed;
export const Sequence = [State.GreenRed, State.YellowRed, State.RedGreen, State.RedYellow];
